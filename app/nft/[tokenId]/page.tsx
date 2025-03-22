'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, Share, ExternalLink } from 'lucide-react'
import { useReadCollectibleNftTokenUri } from '@/app/utils/collectible-nft'
import { useReadMarketOrderOfId } from '@/app/utils/market'
import { useState, useEffect } from 'react'
import { use } from 'react'
import { formatUnits } from 'viem'

// Add these type definitions at the top of the file
interface Attribute {
  trait_type: string;
  value: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Attribute[];
}

// Add this helper function at the top of the file
const truncateAddress = (address: string) => {
  if (!address || address === 'Unknown Owner') return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

function NFTDetailContent({ tokenId }: { tokenId: string }) {
  const { data: tokenUri, isLoading: isLoadingUri } = useReadCollectibleNftTokenUri({
    args: [BigInt(tokenId)],
  })

  // Add marketplace order query
  const { data: orderData, isLoading: isLoadingOrder } = useReadMarketOrderOfId({
    args: [BigInt(tokenId)],
  })

  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null)
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true)

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenUri) return
      try {
        // Remove ipfs:// prefix if present and use gateway URL
        const url = tokenUri.replace('ipfs://', `${process.env.NEXT_PUBLIC_IPFS_URL}:8080/ipfs/`)
        const response = await fetch(url)
        const metadata = await response.json()
        setNftMetadata(metadata)
      } catch (error) {
        console.error('Error fetching metadata:', error)
      } finally {
        setIsLoadingMetadata(false)
      }
    }

    fetchMetadata()
  }, [tokenUri])

  if (isLoadingUri || isLoadingMetadata || isLoadingOrder) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Update the nft object construction
  const nft = {
    id: tokenId,
    name: nftMetadata?.name || `NFT #${tokenId}`,
    description: nftMetadata?.description || 'No description available',
    image: nftMetadata?.image || '/placeholder.jpg',
    price: {
      amount: orderData?.[2] ? formatUnits(orderData[2], 6) : 'Not for sale',
      currency: 'USDT',
    },
    tags: nftMetadata?.attributes?.filter((attr: Attribute) => attr.trait_type === "Tag").map(attr => attr.value) || ['NFT'],
    details: {
      contractAddress: process.env.NEXT_PUBLIC_COLLECTIBLE_NFT_ADDRESS || '',
      owner: orderData?.[0] || 'Unknown Owner',
      tokenId: tokenId,
      tokenStandard: 'ERC-721',
      blockchain: process.env.NODE_ENV === 'production' ? 'Sepolia' : 'Hardhat',
      feePercentage: '2.5%'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to marketplace</span>
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - NFT Image and Additional Info */}
          <div className="w-full lg:w-[45%]">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={nft.image} 
                alt={nft.name}
                width={1000}
                height={1000}
                className="w-full h-[450px] object-cover"
              />
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Add to Favorites</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          {/* Right Column - NFT Details */}
          <div className="w-full lg:w-[55%]">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{nft.name}</h1>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {nft.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-gray-500">Current Price</div>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold">{nft.price.amount} {nft.price.currency}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                  Buy Now
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Description</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {nft.description}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">Details</h2>
                <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0 h-auto flex items-center">
                  View on blockchain
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-xl p-4 shadow-sm">
                {Object.entries(nft.details).map(([key, value], index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <div className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                    <div 
                      className="text-gray-900 font-medium hover:cursor-pointer"
                      title={['contractAddress', 'owner'].includes(key) ? value : undefined}
                    >
                      {['contractAddress', 'owner'].includes(key) ? truncateAddress(value as string) : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Server component
export default function NftDetailPage({ params }: { params: Promise<{ tokenId: string }> }) {
  const unwrappedParams = use(params)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NFTDetailContent tokenId={unwrappedParams.tokenId} />
    </div>
  )
} 