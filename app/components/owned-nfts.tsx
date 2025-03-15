'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

type NFT = {
  id: number
  name: string
  image: string
  status: 'owned' | 'listed'
  price: string | null
}

export default function OwnedNFTs() {
  // Mock data moved inside component
  const ownedNfts: NFT[] = [
    {
      id: 1,
      name: 'Digital Dreams #08',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      status: 'owned',
      price: null
    },
    {
      id: 3,
      name: 'Neon Dreamscape #12',
      image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223',
      status: 'owned',
      price: null
    }
  ]

  if (ownedNfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 mb-4">You don't own any NFTs yet</p>
        <Button>
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