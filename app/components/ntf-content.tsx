'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SortDesc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useReadMarketGetAllNfTs } from '@/app/utils/market'
import { useReadCollectibleNftTokenUri } from '@/app/utils/collectible-nft'
import { useState, useEffect } from 'react'

export function NFTContent() {
  const { data: nfts, isLoading: isLoadingNFTs } = useReadMarketGetAllNfTs()
  
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All NFTs</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <SortDesc className="h-4 w-4" />
            <span>Sort by: Recent</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">All NFTs</TabsTrigger>
          <TabsTrigger value="art" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Art</TabsTrigger>
          <TabsTrigger value="collectibles" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Collectibles</TabsTrigger>
          <TabsTrigger value="music" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Music</TabsTrigger>
          <TabsTrigger value="photography" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Photography</TabsTrigger>
          <TabsTrigger value="virtual" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Virtual Worlds</TabsTrigger>
          <TabsTrigger value="sports" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Sports</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoadingNFTs ? (
            <div className="col-span-full text-center py-10">Loading NFTs...</div>
          ) : nfts && nfts.length > 0 ? (
            nfts.map((nft) => (
              <NFTCard
                key={nft.tokenId}
                href={`/nft/${nft.tokenId}`}
                tokenId={nft.tokenId}
                address={nft.seller}
                price={nft.price.toString()}
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
}

function NFTCard({ href, tokenId, address, price }: NFTCardProps) {
  const [metadata, setMetadata] = useState<{
    image?: string;
    title?: string;
  } | null>(null)

  const { data: tokenUri } = useReadCollectibleNftTokenUri({
    args: [tokenId],
  })

  useEffect(() => {
    async function fetchMetadata() {
      if (!tokenUri) return
      try {
        const response = await fetch(tokenUri)
        const data = await response.json()
        setMetadata(data)
      } catch (error) {
        console.error('Error fetching NFT metadata:', error)
      }
    }

    fetchMetadata()
  }, [tokenUri])

  if (!metadata) {
    return <div>Loading...</div>
  }

  return (
    <Link href={href}>
      <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
        <div className="relative h-48 w-full">
          <Image 
            src={metadata.image || '/placeholder.png'}
            alt={metadata.title || 'NFT'}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{metadata.title || `NFT #${tokenId.toString()}`}</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">{address}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-gray-500">Current Price</div>
            <div className="text-sm font-semibold">{price} USDT</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
