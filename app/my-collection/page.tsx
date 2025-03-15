'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ProfileSection from '@/app/components/profile-section'

export default function MyCollectionPage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('owned')
  
  // Mock data for NFTs
  const nfts = [
    {
      id: 1,
      name: 'Digital Dreams #08',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'owned',
      price: null
    },
    {
      id: 2,
      name: 'Pixel Universe #27',
      image: 'https://images.unsplash.com/photo-1633101585272-9e0b0c3d9392?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'listed',
      price: '1.5'
    },
    {
      id: 3,
      name: 'Neon Dreamscape #12',
      image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'owned',
      price: null
    },
    {
      id: 4,
      name: 'Cyber Punk City #05',
      image: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'listed',
      price: '2.8'
    }
  ]

  // Filter NFTs based on active tab
  const filteredNfts = activeTab === 'owned' 
    ? nfts.filter(nft => nft.status === 'owned')
    : nfts.filter(nft => nft.status === 'listed')

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <h1 className="text-2xl font-bold mb-6">Connect your wallet to view your collection</h1>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 sm:p-8 mx-auto">
      {/* Profile Section */}
      <ProfileSection />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your NFT Collection</h1>
          <p className="text-gray-500 mt-1">Manage your digital assets</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'owned' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('owned')}
            >
              Owned NFTs
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'listed' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('listed')}
            >
              Listed for Sale
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'activity' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>
        </div>
        
        <div className="p-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNfts.map((nft) => (
              <div key={nft.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${nft.image}')` }}></div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{nft.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    {nft.status === 'owned' && (
                      <>
                        <div className="text-xs text-gray-500">Owned</div>
                        <div className="text-xs text-indigo-600 font-medium">Not Listed</div>
                      </>
                    ) }
                    {nft.status === 'listed' && (
                      <>
                        <div className="text-xs text-gray-500">Listed for</div>
                        <div className="text-sm font-semibold">{nft.price} USDT</div>
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    {nft.status === 'owned' && (
                      <>
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                          size="sm"
                        >
                          List for Sale
                        </Button>
                      </>
                    ) }
                    {
                        nft.status === 'listed' && (
                            <>
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
                        </>
                    )  }
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {activeTab === 'activity' && (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500">No recent activity to display</p>
            </div>
          )}
          
          {filteredNfts.length === 0 && activeTab !== 'activity' && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No NFTs found in this category</p>
              {activeTab === 'owned' && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Buy your first NFT
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 