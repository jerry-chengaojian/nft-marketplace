'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAccount, usePublicClient } from 'wagmi'
import { 
  useReadCollectibleNftBalanceOf,
  collectibleNftAbi,
  collectibleNftAddress,
  useWriteCollectibleNftSafeTransferFrom
} from '@/app/utils/collectible-nft'
import { useNotification } from '@/components/ui/notification-provider'
import { marketAddress } from '@/app/utils/market'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { parseUnits } from 'viem'
import { useQueryClient } from '@tanstack/react-query'
import { 
  CustomDialog, 
  CustomDialogHeader, 
  CustomDialogTitle, 
  CustomDialogDescription, 
  CustomDialogFooter,
  CustomDialogContent
} from '@/components/ui/custom-dialog'

type MetadataAttribute = {
  trait_type: string
  value: string
}

type NFT = {
  id: number
  name: string
  image: string
  description: string
  category: string
  tags: string[]
  status: 'owned' | 'listed'
  price: string | null
}

export default function OwnedNFTs() {
  const { address, isConnected, chainId } = useAccount()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const [ownedNfts, setOwnedNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isListingModalOpen, setIsListingModalOpen] = useState(false)
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null)
  const [listingPrice, setListingPrice] = useState('')
  const [isListing, setIsListing] = useState(false)
  const { showNotification } = useNotification()
  
  const { writeContractAsync: safeTransferFrom } = useWriteCollectibleNftSafeTransferFrom()
  
  // Get the balance (number of NFTs owned by the user)
  const { data: balanceData, isError: balanceError, queryKey } = useReadCollectibleNftBalanceOf({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  })

  // Fetch all NFTs owned by the user
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address || balanceData === undefined || !chainId || !publicClient) {
        setIsLoading(false)
        return
      }
      
      try {
      setIsLoading(true)
        const nfts: NFT[] = []
        const balance = Number(balanceData)
        
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
                    
                    // Extract category and tags from attributes
                    const categoryAttribute = metadata.attributes?.find((attr: MetadataAttribute) => attr.trait_type === 'Category')
                    const tagAttributes = metadata.attributes?.filter((attr: MetadataAttribute) => attr.trait_type === 'Tag') || []
                    
                    nfts.push({
                      id: Number(tokenId),
                      name: metadata.name + ` #${tokenId}` || `NFT #${tokenId}`,
                      image: metadata.image || 'https://placehold.co/600x400?text=NFT+Image',
                      description: metadata.description || '',
                      category: categoryAttribute?.value || '',
                      tags: tagAttributes.map((tag: MetadataAttribute) => tag.value),
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
        showNotification({
          title: 'Failed to load your NFTs',
          description: 'There was an error fetching your NFTs from the blockchain.',
          variant: 'error',
          position: 'bottom-right'
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

  const handleListForSale = (nft: NFT) => {
    setSelectedNft(nft)
    setListingPrice('')
    setIsListingModalOpen(true)
  }
  
  const handleConfirmListing = async () => {
    if (!selectedNft || !address || !chainId) return
    
    try {
      setIsListing(true)
      
      // Validate price
      if (!listingPrice || parseFloat(listingPrice) <= 0) {
        showNotification({
          title: 'Invalid price',
          description: 'Please enter a valid price',
          variant: 'error',
          position: 'bottom-right'
        })
        return
      }
      
      // Convert price to USDT units (6 decimals for USDT)
      const priceInUsdtUnits = parseUnits(listingPrice, 6)
      
      // Encode price data for the safeTransferFrom call
      // The market contract will extract this data to set the listing price
      const priceData = priceInUsdtUnits.toString(16).padStart(64, '0')
      const data = `0x${priceData}`
      
      // Call safeTransferFrom to transfer the NFT to the marketplace
      const tx = await safeTransferFrom({
        args: [
          address,
          marketAddress[chainId as keyof typeof marketAddress],
          BigInt(selectedNft.id),
          data as `0x${string}`
        ]
      })
      
      showNotification({
        title: 'NFT listing initiated',
        description: 'Your transaction is being processed...',
        variant: 'info',
        position: 'bottom-right'
      })
      
      // Close modal
      setIsListingModalOpen(false)
      
      // Wait for transaction to be mined
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: tx })
        
        showNotification({
          title: 'NFT listed successfully',
          description: `Your NFT has been listed for ${listingPrice} USDT`,
          variant: 'success',
          position: 'bottom-right'
        })
        
        // Invalidate NFT balance, Market queries, and account balance
        queryClient.invalidateQueries({ queryKey }) // NFT balance query
        queryClient.invalidateQueries({ 
          queryKey: [
            'readContract',
            {
              address: marketAddress[chainId as keyof typeof marketAddress],
              functionName: 'getMyNFTs',
            }
          ]
        }) // Market getMyNFTs query
        queryClient.invalidateQueries({ 
          queryKey: ['balance', { address }]
        }) // Account balance query
      }
    } catch (error) {
      console.error('Error listing NFT:', error)
      showNotification({
        title: 'Failed to list NFT',
        description: 'There was an error listing your NFT. Please try again.',
        variant: 'error',
        position: 'bottom-right'
      })
    } finally {
      setIsListing(false)
    }
  }

  return (
    <>
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
                  onClick={() => handleListForSale(nft)}
                >
                  List for Sale
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Listing Modal */}
      <CustomDialog open={isListingModalOpen} onOpenChange={setIsListingModalOpen} className="w-full max-w-[425px]">
        <CustomDialogHeader>
          <CustomDialogTitle>List NFT for Sale</CustomDialogTitle>
          <CustomDialogDescription>
            Set a price for your NFT in USDT. Once listed, it will be available for purchase in the marketplace.
          </CustomDialogDescription>
        </CustomDialogHeader>
        
        <CustomDialogContent className="grid gap-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="price" className="text-right col-span-2">
              Price (USDT)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="10"
              className="col-span-4"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
            />
          </div>
          
          {selectedNft && (
            <div className="flex items-center gap-4 mt-2">
              <div className="h-16 w-16 bg-cover bg-center rounded" 
                style={{ backgroundImage: `url('${selectedNft.image}')` }}>
              </div>
              <div>
                <p className="font-medium">{selectedNft.name}</p>
                <p className="text-sm text-gray-500">ID: {selectedNft.id}</p>
              </div>
            </div>
          )}
        </CustomDialogContent>
        
        <CustomDialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsListingModalOpen(false)}
            disabled={isListing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmListing}
            disabled={isListing || !listingPrice}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isListing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                Listing...
              </>
            ) : (
              'Confirm Listing'
            )}
          </Button>
        </CustomDialogFooter>
      </CustomDialog>
    </>
  )
} 