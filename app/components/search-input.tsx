'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useNFTStore } from '@/app/store/nft-store'
import { cn } from '@/lib/utils'
import { formatUnits } from 'viem'
import { useRouter } from 'next/navigation'

export function SearchInput({ className }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const metadata = useNFTStore((state) => state.metadata) || {}
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const searchResults = (query?.length > 0 && metadata && Object.keys(metadata).length > 0)
    ? Object.entries(metadata).filter(([_, nft]) => {
        if (!nft) return false
        const searchableText = `
          ${nft.name?.toLowerCase() || ''}
          ${nft.description?.toLowerCase() || ''}
          ${nft.external_url?.toLowerCase() || ''}
          ${nft.attributes?.map(attr => `${attr.trait_type || ''} ${attr.value || ''}`).join(' ').toLowerCase() || ''}
          ${nft.address?.toLowerCase() || ''}
          ${nft.price ? formatUnits(BigInt(nft.price), 6) : ''}
        `
        return searchableText.includes(query.toLowerCase())
      })
    : []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <Input 
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
        }}
        placeholder="Search NFTs, collections, or artists..." 
        className={cn("pl-10 pr-4 rounded-xl", className)}
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
          {searchResults.map(([tokenId, nft]) => (
            <div 
              key={tokenId}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              onClick={() => {
                setIsOpen(false)
                router.push(`/nft/${tokenId}`)
              }}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{nft.name}</p>
                  <p className="text-sm text-gray-500 truncate">{nft.description && nft.description.slice(0, 20)}</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{nft.price ? formatUnits(BigInt(nft.price), 6) : ''} USDT</span>
                    <span>{`${nft.address.slice(0, 6)}...${nft.address.slice(-4)}`}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 