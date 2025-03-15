'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Search, Bell } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Navbar() {
  return (
    <header className="px-8 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
      <div className="flex items-center">
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">NFTMarket</span>
        <div className="ml-12 flex space-x-6">
          <Link href="#" className="text-indigo-600 font-medium">Marketplace</Link>
          <Link href="#" className="text-gray-500 hover:text-gray-800">Create</Link>
          <Link href="#" className="text-gray-500 hover:text-gray-800">Community</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search NFTs, collections, or artists..." 
            className="w-96 pl-10 pr-4 rounded-xl"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-gray-500" />
        </Button>
        <ConnectButton accountStatus="address" showBalance={false} />
      </div>
    </header>
  )
} 