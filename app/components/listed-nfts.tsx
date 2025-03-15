'use client'

import { Button } from '@/components/ui/button'

type NFT = {
  id: number
  name: string
  image: string
  status: 'owned' | 'listed'
  price: string | null
}

export default function ListedNFTs() {
  // Mock data moved inside component
  const listedNfts: NFT[] = [
    {
      id: 2,
      name: 'Pixel Universe #27',
      image: 'https://images.unsplash.com/photo-1633101585272-9e0b0c3d9392',
      status: 'listed',
      price: '1.5'
    },
    {
      id: 4,
      name: 'Cyber Punk City #05',
      image: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39',
      status: 'listed',
      price: '2.8'
    }
  ]

  if (listedNfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 mb-4">You haven't listed any NFTs for sale</p>
      </div>
    )
  }

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
              >
                Edit Listing
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 border border-red-200" 
                size="sm"
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