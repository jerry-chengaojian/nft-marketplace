'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useReadMarketGetAllNfTs } from '@/app/utils/market'
import { useReadCollectibleNftTokenUri } from '@/app/utils/collectible-nft'
import { useState, useEffect } from 'react'
import { formatUnits } from 'viem'

interface NFTMetadata {
  image?: string;
  title?: string;
}

export function RecentlyListedNFTs() {
  const { data: nfts, isLoading } = useReadMarketGetAllNfTs()
  const [recentNFTs, setRecentNFTs] = useState<Array<{
    tokenId: bigint;
    price: bigint;
    metadata: NFTMetadata | null;
  }>>([])

  useEffect(() => {
    if (nfts) {
      // Get the last 3 NFTs
      const latestNFTs = [...nfts]
        .reverse()
        .slice(0, 3)
        .map(nft => ({
          tokenId: nft.tokenId,
          price: nft.price,
          metadata: null
        }))
      setRecentNFTs(latestNFTs)
    }
  }, [nfts])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="hidden lg:block w-80 border-l border-gray-100 p-6 bg-white">
      <h2 className="text-lg font-bold mb-4">Recently Listed</h2>
      
      <div className="space-y-4">
        {recentNFTs.map((nft) => (
          <RecentNFTCard
            key={nft.tokenId.toString()}
            tokenId={nft.tokenId}
            price={nft.price}
          />
        ))}
      </div>
    </div>
  )
}

function RecentNFTCard({ tokenId, price }: { tokenId: bigint; price: bigint }) {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null)
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
        }
      } catch (error) {
        console.error('Error fetching NFT metadata:', error)
      }
    }

    fetchMetadata()

    return () => {
      isMounted = false
    }
  }, [tokenUri])

  if (!metadata) {
    return <div>Loading...</div>
  }

  return (
    <Link href={`/nft/${tokenId}`} className="block">
      <Card className="bg-white p-3 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
        <CardContent className="p-0 flex items-center">
          <div className="relative w-16 h-16 rounded-lg mr-3 overflow-hidden">
            <Image 
              src={metadata.image || ''}
              alt={metadata.title || `NFT #${tokenId}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{metadata.title + ' #' + tokenId.toString() || `NFT #${tokenId.toString()}`}</h3>
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-500">Recently Listed</div>
              <div className="text-sm font-semibold">{formatUnits(price, 6)} USDT</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 