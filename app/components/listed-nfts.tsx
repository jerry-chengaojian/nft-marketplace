'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAccount, usePublicClient } from 'wagmi'
import { useReadMarketGetMyNfTs } from '@/app/utils/market'
import { useReadCollectibleNftTokenUri } from '@/app/utils/collectible-nft'
import { formatUnits } from 'viem'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  collectibleNftAbi,
  collectibleNftAddress,
} from '@/app/utils/collectible-nft'

type NFT = {
  id: number
  name: string
  image: string
  status: 'owned' | 'listed'
  price: string | null
}

export default function ListedNFTs() {
  const { address, isConnected, chainId } = useAccount()
  const [listedNfts, setListedNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const publicClient = usePublicClient()

  // Fetch listed NFTs from the market contract
  const { data: marketNfts, isError: isMarketError, isLoading: isMarketLoading } = 
    useReadMarketGetMyNfTs({
      query: {
        enabled: isConnected && !!address,
      }
    })

  // Process NFT data and fetch metadata
  useEffect(() => {
    const fetchNftMetadata = async () => {
      if (!marketNfts || marketNfts.length === 0 || !publicClient || !chainId) {
        setIsLoading(false)
        return
      }

      try {
        const nftPromises = marketNfts.map(async (nft) => {
          // Fetch token URI for each NFT using publicClient
          const tokenUri = await publicClient.readContract({
            address: collectibleNftAddress[chainId as keyof typeof collectibleNftAddress],
            abi: collectibleNftAbi,
            functionName: 'tokenURI',
            args: [nft.tokenId]
          })

          // Fetch metadata from the token URI
          let metadata = { name: `NFT #${nft.tokenId.toString()}`, image: '' }
          try {
            // If the URI is IPFS or HTTP, fetch the metadata
            if (tokenUri) {
              const response = await fetch(tokenUri)
              if (response.ok) {
                metadata = await response.json()
              }
            }
          } catch (err) {
            console.error('Error fetching metadata:', err)
          }

          return {
            id: Number(nft.tokenId),
            name: metadata.name,
            image: metadata.image || 'https://placehold.co/600x400?text=NFT+Image',
            status: 'listed',
            price: formatUnits(nft.price, 6)
          } as NFT
        })

        const nftsWithMetadata = await Promise.all(nftPromises)
        setListedNfts(nftsWithMetadata)
      } catch (err) {
        console.error('Error processing NFTs:', err)
        setError('Failed to load your listed NFTs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    if (marketNfts && !isMarketLoading) {
      fetchNftMetadata()
    }
  }, [marketNfts, isMarketLoading, address])

  // Handle cancel listing
  const handleCancelListing = async (tokenId: number) => {
    // Implementation for cancelling listing will go here
    console.log('Cancel listing for token ID:', tokenId)
  }

  // Handle edit listing
  const handleEditListing = async (tokenId: number) => {
    // Implementation for editing listing will go here
    console.log('Edit listing for token ID:', tokenId)
  }

  // Loading state
  if (isLoading || isMarketLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Error state
  if (isMarketError || error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error || "Failed to load your listed NFTs. Please check your connection and try again."}
        </AlertDescription>
      </Alert>
    )
  }

  // Empty state
  if (listedNfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 mb-4">You haven't listed any NFTs for sale</p>
      </div>
    )
  }

  // Render NFTs
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listedNfts.map((nft) => (
        <div key={nft.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${nft.image}')` }}></div>
          <div className="p-4">
            <h3 className="font-semibold truncate">{nft.name}</h3>
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">Listed for</div>
              <div className="text-sm font-semibold">{nft.price} USDT</div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700" 
                size="sm"
                onClick={() => handleEditListing(nft.id)}
              >
                Edit Listing
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 border border-red-200" 
                size="sm"
                onClick={() => handleCancelListing(nft.id)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 