'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ProfileSection from './components/profile-section'
import OwnedNFTs from './components/owned-nfts'
import ListedNFTs from './components/listed-nfts'
import ActivityTab from './components/activity-tab'

export default function MyCollectionPage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('owned')

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
          {activeTab === 'owned' && <OwnedNFTs />}
          {activeTab === 'listed' && <ListedNFTs />}
          {activeTab === 'activity' && <ActivityTab />}
        </div>
      </div>
    </div>
  )
} 