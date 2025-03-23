'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAccount, usePublicClient } from 'wagmi'
import { useReadMarketGetNfTsByOwner } from '@/app/utils/market'
import { formatUnits } from 'viem'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  collectibleNftAbi,
  collectibleNftAddress,
} from '@/app/utils/collectible-nft'
import { useWriteMarketChangePrice, useWriteMarketCancelOrder } from '@/app/utils/market'
import { parseUnits } from 'viem'
import { useQueryClient } from '@tanstack/react-query'
import { useNotification } from '@/components/ui/notification-provider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  status: 'owned' | 'listed'
  price: string | null
}

export default function ListedNFTs() {
  const { address, isConnected, chainId } = useAccount()
  const [listedNfts, setListedNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const publicClient = usePublicClient()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null)
  const [newPrice, setNewPrice] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  
  const { writeContractAsync: changePrice } = useWriteMarketChangePrice()
  const { writeContractAsync: cancelOrder } = useWriteMarketCancelOrder()

  // Fetch listed NFTs from the market contract
  const { data: marketNfts, isError: isMarketError, isLoading: isMarketLoading, queryKey } = 
    useReadMarketGetNfTsByOwner({
      args: address ? [address] : undefined,
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
          let metadata = { 
            name: `NFT #${nft.tokenId.toString()}`, 
            image: '',
            description: '',
            external_url: '',
            attributes: [] as MetadataAttribute[]
          }
          try {
            if (tokenUri) {
              const response = await fetch(tokenUri)
              if (response.ok) {
                metadata = await response.json()
              }
            }
          } catch (err) {
            console.error('Error fetching metadata:', err)
          }

          // Extract category and tags from attributes if they exist
          const categoryAttribute = metadata.attributes?.find(attr => attr.trait_type === 'Category')
          const tagAttributes = metadata.attributes?.filter(attr => attr.trait_type === 'Tag') || []

          return {
            id: Number(nft.tokenId),
            name: metadata.name,
            image: metadata.image || '',
            description: metadata.description,
            category: categoryAttribute?.value || '',
            tags: tagAttributes.map(tag => tag.value),
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
    try {
      const tx = await cancelOrder({
        args: [BigInt(tokenId)]
      })

      showNotification({
        title: 'Cancellation initiated',
        description: 'Your transaction is being processed...',
        variant: 'info',
        position: 'bottom-right'
      })

      // Wait for transaction to be mined
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: tx })

        showNotification({
          title: 'Success',
          description: 'NFT listing cancelled successfully',
          variant: 'success',
          position: 'bottom-right'
        })

        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ 
          queryKey: ['balance', { address }]
        })
        queryClient.invalidateQueries({ queryKey })
        queryClient.invalidateQueries({ 
          queryKey: [
            'readContract',
            {
              address: collectibleNftAddress[chainId as keyof typeof collectibleNftAddress],
              functionName: 'balanceOf',
            }
          ]
        })
      }
    } catch (error) {
      console.error('Error cancelling listing:', error)
      showNotification({
        title: 'Failed to cancel listing',
        description: 'There was an error cancelling your listing. Please try again.',
        variant: 'error',
        position: 'bottom-right'
      })
    }
  }

  // Handle edit listing
  const handleEditListing = async (nft: NFT) => {
    setSelectedNft(nft)
    setNewPrice(nft.price || '')
    setIsEditModalOpen(true)
  }

  const handleConfirmEdit = async () => {
    if (!selectedNft || !chainId) return

    try {
      setIsEditing(true)

      // Validate price
      if (!newPrice || parseFloat(newPrice) <= 0) {
        showNotification({
          title: 'Invalid price',
          description: 'Please enter a valid price',
          variant: 'error',
          position: 'bottom-right'
        })
        return
      }

      // Convert price to USDT units (6 decimals)
      const priceInUsdtUnits = parseUnits(newPrice, 6)

      // Call changePrice function
      const tx = await changePrice({
        args: [BigInt(selectedNft.id), priceInUsdtUnits]
      })

      showNotification({
        title: 'Price update initiated',
        description: 'Your transaction is being processed...',
        variant: 'info',
        position: 'bottom-right'
      })

      // Close modal
      setIsEditModalOpen(false)

      // Wait for transaction to be mined
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: tx })

        showNotification({
          title: 'Price updated successfully',
          description: `New price set to ${newPrice} USDT`,
          variant: 'success',
          position: 'bottom-right'
        })

        queryClient.invalidateQueries({ 
          queryKey: ['balance', { address }]
        }) // Account balance query

        queryClient.invalidateQueries({ queryKey }) // NFT balance query
      }
    } catch (error) {
      console.error('Error updating price:', error)
      showNotification({
        title: 'Failed to update price',
        description: 'There was an error updating the price. Please try again.',
        variant: 'error',
        position: 'bottom-right'
      })
    } finally {
      setIsEditing(false)
    }
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listedNfts.map((nft) => (
          <div key={nft.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${nft.image}')` }}></div>
            <div className="p-4">
              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-gray-500">Listed for</div>
                <div className="text-sm font-semibold">{nft.price} USDT</div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700" 
                  size="sm"
                  onClick={() => handleEditListing(nft)}
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

      <CustomDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <CustomDialogHeader>
          <CustomDialogTitle>Edit Listing Price</CustomDialogTitle>
          <CustomDialogDescription>
            Set a new price for your NFT in USDT. The change will be reflected once the transaction is confirmed.
          </CustomDialogDescription>
        </CustomDialogHeader>
        
        <CustomDialogContent className="grid gap-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="price" className="text-right col-span-2">
              New Price (USDT)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="10"
              className="col-span-4"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          
          {selectedNft && (
            <div className="flex items-center gap-4 mt-2">
              <div className="h-16 w-16 bg-cover bg-center rounded" 
                style={{ backgroundImage: `url('${selectedNft.image}')` }}>
              </div>
              <div>
                <p className="font-medium">{selectedNft.name}</p>
                <p className="text-sm text-gray-500">Current Price: {selectedNft.price} USDT</p>
              </div>
            </div>
          )}
        </CustomDialogContent>
        
        <CustomDialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsEditModalOpen(false)}
            disabled={isEditing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmEdit}
            disabled={isEditing || !newPrice}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isEditing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                Updating...
              </>
            ) : (
              'Confirm Update'
            )}
          </Button>
        </CustomDialogFooter>
      </CustomDialog>
    </>
  )
} 