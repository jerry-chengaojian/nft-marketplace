'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Search, Bell, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="px-4 sm:px-8 py-4 border-b border-gray-100 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">NFTMarket</span>
          <div className="hidden md:flex ml-12 space-x-6">
            <Link href="#" className="text-indigo-600 font-medium">Marketplace</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">Create</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">Community</Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search NFTs, collections, or artists..." 
              className="w-64 lg:w-96 pl-10 pr-4 rounded-xl"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <ConnectButton accountStatus="address" showBalance={false} />
        </div>
        
        {/* Mobile search button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-500" />
            ) : (
              <Menu className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link href="#" className="text-indigo-600 font-medium py-2">Marketplace</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800 py-2">Create</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800 py-2">Community</Link>
          </div>
          <div className="pt-3 border-t border-gray-100">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5 text-gray-500" />
              </Button>
              <ConnectButton accountStatus="address" showBalance={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 