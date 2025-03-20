'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SortDesc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useReadMarketGetAllNfTs } from '@/app/utils/market'
import { useReadCollectibleNftTokenUri } from '@/app/utils/collectible-nft'
import { useState, useEffect, useCallback } from 'react'
import { formatUnits } from 'viem';

export function NFTContent() {
  const { data: nfts, isLoading: isLoadingNFTs } = useReadMarketGetAllNfTs()
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortAscending, setSortAscending] = useState(true)
  const [topTags, setTopTags] = useState<string[]>(['all'])
  const [filteredNFTs, setFilteredNFTs] = useState<typeof nfts>([])
  const [allMetadataTags, setAllMetadataTags] = useState<Map<string, string[]>>(new Map())

  // Set initial filtered NFTs when nfts data loads
  useEffect(() => {
    if (nfts) {
      setFilteredNFTs(nfts)
    }
  }, [nfts])

  // Calculate top tags whenever metadata is updated
  useEffect(() => {
    if (!nfts) return

    const tagCounts = new Map<string, number>()
    tagCounts.set('all', nfts.length)

    // Count occurrences of each tag
    allMetadataTags.forEach((tags) => {
      tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })

    // Sort tags by count and get top 6
    const sortedTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
      .slice(0, 7)

    if (JSON.stringify(sortedTags) !== JSON.stringify(topTags)) {
      setTopTags(sortedTags)
    }
  }, [allMetadataTags, nfts])

  // Memoize the updateNFTMetadata callback
  const updateNFTMetadata = useCallback((tokenId: string, tags: string[]) => {
    setAllMetadataTags(prev => {
      const newMap = new Map(prev)
      newMap.set(tokenId, tags)
      return newMap
    })
  }, [])

  // Update the filtering effect to include sorting
  useEffect(() => {
    if (!nfts) return
    
    let sorted = [...(nfts || [])]
    sorted.sort((a, b) => sortAscending 
      ? Number(a.tokenId - b.tokenId)
      : Number(b.tokenId - a.tokenId)
    )
    
    if (selectedTag === 'all') {
      setFilteredNFTs(sorted)
    } else {
      const filtered = sorted.filter(nft => 
        allMetadataTags.get(nft.tokenId.toString())?.includes(selectedTag)
      )
      setFilteredNFTs(filtered)
    }
  }, [selectedTag, nfts, allMetadataTags, sortAscending])

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All NFTs</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => setSortAscending(!sortAscending)}
          >
            <SortDesc className={`h-4 w-4 transition-transform ${sortAscending ? 'rotate-180' : ''}`} />
            <span>Sort by: {sortAscending ? 'Earliest' : 'Recent'}</span>
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTag} onValueChange={setSelectedTag} className="mb-8">
        <TabsList className="bg-transparent">
          {topTags.map((tag) => (
            <TabsTrigger
              key={tag}
              value={tag}
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3"
            >
              {tag === 'all' ? 'All NFTs' : tag}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoadingNFTs ? (
            <div className="col-span-full text-center py-10">Loading NFTs...</div>
          ) : filteredNFTs && filteredNFTs.length > 0 ? (
            filteredNFTs.map((nft) => (
              <NFTCard
                key={nft.tokenId}
                href={`/nft/${nft.tokenId}`}
                tokenId={nft.tokenId}
                address={nft.seller}
                price={nft.price.toString()}
                onMetadataLoad={(tags) => updateNFTMetadata(nft.tokenId.toString(), tags)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">No NFTs found</div>
          )}
        </div>
      </div>
    </div>
  );
}

interface NFTCardProps {
  href: string;
  tokenId: bigint;
  address: string;
  price: string;
  onMetadataLoad: (tags: string[]) => void;
}

function NFTCard({ href, tokenId, address, price, onMetadataLoad }: NFTCardProps) {
  const [metadata, setMetadata] = useState<{
    image?: string;
    title?: string;
    tags?: string[];
  } | null>(null)

  const { data: tokenUri } = useReadCollectibleNftTokenUri({
    args: [tokenId],
  })

  useEffect(() => {
    let isMounted = true

    async function fetchMetadata() {
      if (!tokenUri) return
      try {
        const response = await fetch(tokenUri)
        const data = await response.json()
        if (isMounted) {
          setMetadata(data)
          if (data.tags) {
            onMetadataLoad(data.tags)
          }
        }
      } catch (error) {
        console.error('Error fetching NFT metadata:', error)
      }
    }

    fetchMetadata()

    return () => {
      isMounted = false
    }
  }, [tokenUri, onMetadataLoad])

  if (!metadata) {
    return <div>Loading...</div>
  }

  return (
    <Link href={href}>
      <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
        <div className="relative h-48 w-full">
          <Image 
            src={metadata.image || ''}
            alt={metadata.title + ' #' + tokenId.toString() || 'NFT'}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{metadata.title + ' #' + tokenId.toString() || `NFT #${tokenId.toString()}`}</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">{address.slice(0, 6) + '...' + address.slice(-4)}</span>
          </div>
          {metadata?.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {metadata.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-gray-500">Current Price</div>
            <div className="text-sm font-semibold">{formatUnits(BigInt(price), 6)} USDT</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
