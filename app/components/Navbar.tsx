'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Search, Bell, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SearchInput } from '@/app/components/search-input'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const removeScrollLock = () => {
      document.body.removeAttribute('data-scroll-locked');
      document.body.style.paddingRight = '0';
    };

    // Remove immediately if present
    removeScrollLock();

    // Set up observer for future changes
    const observer = new MutationObserver(() => removeScrollLock());
    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href
    return `${
      isActive 
        ? 'text-blue-600 font-medium border-b-2 border-blue-600' 
        : 'text-gray-500 border-b-2 border-transparent'
    } hover:text-gray-800 transition-all duration-200 py-1`
  }

  return (
    <header className="px-4 sm:px-8 py-4 border-b border-gray-100 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">NFTMarket</span>
          <div className="hidden md:flex ml-12 space-x-6">
            <Link href="/" className={getLinkClassName('/')}>Marketplace</Link>
            <Link href="/create" className={getLinkClassName('/create')}>Create</Link>
            <Link href="/my-collection" className={getLinkClassName('/my-collection')}>My Collection</Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <SearchInput className="w-64 lg:w-96" />
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
            <Link href="/" className={getLinkClassName('/')}>Marketplace</Link>
            <Link href="/create" className={getLinkClassName('/create')}>Create</Link>
            <Link href="/my-collection" className={getLinkClassName('/my-collection')}>My Collection</Link>
          </div>
          <div className="pt-3 border-t border-gray-100">
            <div className="relative mb-4">
              <SearchInput className="w-full" />
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