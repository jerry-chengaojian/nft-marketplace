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
import { useNFTStore } from '../store/nft-store';

// Add type definition at the top
type MetadataAttribute = {
  trait_type: string
  value: string
}

export function NFTContent() {
  const { data: nfts, isLoading: isLoadingNFTs } = useReadMarketGetAllNfTs()
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortAscending, setSortAscending] = useState(true)
  const [filteredNFTs, setFilteredNFTs] = useState<typeof nfts>([])

  // Define fixed categories
  const categories = [
    { value: 'all', label: 'All NFTs' },
    { value: 'art', label: 'Art' },
    { value: 'collectibles', label: 'Collectibles' },
    { value: 'music', label: 'Music' },
    { value: 'photography', label: 'Photography' },
    { value: 'virtual-worlds', label: 'Virtual Worlds' },
    { value: 'sports', label: 'Sports' },
    { value: 'utility', label: 'Utility' },
  ]

  // Update the filtering effect
  useEffect(() => {
    if (!nfts) return
    
    let sorted = [...(nfts || [])]
    sorted.sort((a, b) => sortAscending 
      ? Number(a.tokenId - b.tokenId)
      : Number(b.tokenId - a.tokenId)
    )
    setFilteredNFTs(sorted)
  }, [selectedTag, nfts, sortAscending])

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
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoadingNFTs ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-500">Loading NFTs...</p>
            </div>
          ) : filteredNFTs && filteredNFTs.length > 0 ? (
            filteredNFTs.map((nft) => (
              <NFTCard
                key={nft.tokenId}
                href={`/nft/${nft.tokenId}`}
                tokenId={nft.tokenId}
                address={nft.seller}
                price={nft.price.toString()}
                selectCategory={selectedTag}
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
  selectCategory: string;
}

function NFTCard({ href, tokenId, address, price, selectCategory }: NFTCardProps) {
  const [metadata, setMetadata] = useState<{
    name: string
    description: string
    image: string
    external_url: string
    attributes: MetadataAttribute[]
  } | null>(null)

  const { data: tokenUri } = useReadCollectibleNftTokenUri({
    args: [tokenId],
  })

  const setStoreMetadata = useNFTStore(state => state.setMetadata)

  useEffect(() => {
    let isMounted = true

    async function fetchMetadata() {
      if (!tokenUri) return
      try {
        const response = await fetch(tokenUri)
        const data = await response.json()
        if (isMounted) {
          setMetadata(data)
          setStoreMetadata(tokenId.toString(), {
            ...data,
            address,
            price
          })
        }
      } catch (error) {
        console.error('Error fetching NFT metadata:', error)
      }
    }

    fetchMetadata()

    return () => {
      isMounted = false
    }
  }, [tokenUri, address, price])

  if (!metadata) {
    return null;
  }

  const matchesCategory = selectCategory === 'all' || metadata.attributes?.some(attr => 
    (attr.trait_type.toLowerCase() === 'category' || attr.trait_type.toLowerCase() === 'type') && 
    attr.value.toLowerCase() === selectCategory.toLowerCase()
  )

  if (!matchesCategory) {
    return null
  }

  const tagAttributes = metadata.attributes?.filter(attr => attr.trait_type === 'Tag') || []

  return (
    <Link href={href}>
      <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
        <div className="relative h-48 w-full">
          <Image 
            src={metadata.image || ''}
            alt={metadata.name + ' #' + tokenId.toString() || 'NFT'}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{metadata.name + ' #' + tokenId.toString()}</h3>
          {metadata.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{metadata.description}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {tagAttributes.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {tag.value}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-gray-500">Current Price</div>
            <div className="text-sm font-semibold">{formatUnits(BigInt(price), 6)} USDT</div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-500">Seller</div>
            <div className="text-xs font-medium text-gray-600">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
