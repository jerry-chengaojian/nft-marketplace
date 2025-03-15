'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccount, usePublicClient } from 'wagmi'
import { 
  useReadCollectibleNftBalanceOf,
  collectibleNftAbi,
  collectibleNftAddress
} from '@/app/utils/collectible-nft'
import { toast } from 'sonner'

type NFT = {
  id: number
  name: string
  image: string
  status: 'owned' | 'listed'
  price: string | null
  description?: string
  category?: string
  tags?: string[]
}

export default function OwnedNFTs() {
  const { address, isConnected, chainId } = useAccount()
  const publicClient = usePublicClient()
  const [ownedNfts, setOwnedNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Get the balance (number of NFTs owned by the user)
  const { data: balanceData, isError: balanceError } = useReadCollectibleNftBalanceOf({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  })
  
  // Fetch all NFTs owned by the user
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address || !balanceData || balanceData === BigInt(0) || !chainId || !publicClient) {
        setIsLoading(false)
        return
      }
      
      try {
        const nfts: NFT[] = []
        const balance = Number(balanceData)
        debugger;
        
        for (let i = 0; i < balance; i++) {
          try {
            // Get token ID for each NFT owned by the user
            const tokenId = await publicClient.readContract({
              address: collectibleNftAddress[chainId as keyof typeof collectibleNftAddress],
              abi: collectibleNftAbi,
              functionName: 'tokenOfOwnerByIndex',
              args: [address, BigInt(i)]
            })
            
            // Check if tokenId exists (including when it's 0)
            if (tokenId !== undefined && tokenId !== null) {
              // Get token URI for the NFT
              const tokenUri = await publicClient.readContract({
                address: collectibleNftAddress[chainId as keyof typeof collectibleNftAddress],
                abi: collectibleNftAbi,
                functionName: 'tokenURI',
                args: [tokenId]
              })
              
              // Check if tokenUri exists
              if (tokenUri !== undefined && tokenUri !== null) {
                try {
                  // Fetch metadata from IPFS
                  const response = await fetch(tokenUri as string)
                  if (response.ok) {
                    const metadata = await response.json()
                    
                    nfts.push({
                      id: Number(tokenId),
                      name: `${metadata.title} #${tokenId}`,
                      image: metadata.image,
                      description: metadata.description,
                      category: metadata.category,
                      tags: metadata.tags,
                      status: 'owned',
                      price: null
                    })
                  }
                } catch (error) {
                  console.error(`Error fetching metadata for token ${tokenId}:`, error)
                }
              }
            }
          } catch (error) {
            console.error(`Error fetching NFT at index ${i}:`, error)
          }
        }
        
        setOwnedNfts(nfts)
      } catch (error) {
        console.error('Error fetching NFTs:', error)
        toast.error('Failed to load your NFTs', {
          description: 'There was an error fetching your NFTs from the blockchain.'
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchNFTs()
  }, [address, balanceData, chainId, publicClient])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (balanceError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500 mb-4">Error loading your NFTs</p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          size="sm"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (ownedNfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 mb-4">You don't own any NFTs yet</p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Buy your first NFT
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {ownedNfts.map((nft) => (
        <div key={nft.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${nft.image}')` }}></div>
          <div className="p-4">
            <h3 className="font-semibold truncate">{nft.name}</h3>
            {nft.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{nft.description}</p>
            )}
            <div className="flex flex-wrap gap-1 mt-2">
              {nft.tags && nft.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">Owned</div>
              <div className="text-xs text-indigo-600 font-medium">Not Listed</div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                size="sm"
              >
                List for Sale
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 