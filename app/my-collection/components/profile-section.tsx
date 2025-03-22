'use client'

import Link from 'next/link'
import { useAccount, useBalance } from 'wagmi'
import { useReadCollectibleNftBalanceOf } from '../../utils/collectible-nft'
import { useReadMarketGetMyNfTs } from '../../utils/market'
import { useState, useEffect } from 'react'

export default function ProfileSection() {
  const { address, isConnected } = useAccount()
  const [nftCount, setNftCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch ETH balance
  const { data: balanceData, isError: balanceError } = useBalance({
    address,
    query: {
      enabled: isConnected && !!address,
    }
  })

  // Fetch NFT balance
  const { data: nftBalanceData, isError: nftBalanceError } = useReadCollectibleNftBalanceOf({
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    }
  })

  // Fetch NFTs on sale
  const { data: myListedNfts, isError: listedNftsError } = useReadMarketGetMyNfTs({
    query: {
      enabled: isConnected && !!address,
    }
  })

  useEffect(() => {
    if (nftBalanceData !== undefined) {
      setNftCount(Number(nftBalanceData))
      setIsLoading(false)
    } else if (balanceError || nftBalanceError) {
      setIsLoading(false)
    }
  }, [nftBalanceData, balanceError, nftBalanceError])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-2xl">
          <p className="text-gray-700">
            Digital artist exploring the intersection of art and technology. Creating unique NFTs that blend traditional art techniques with digital innovation.
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <Link href="#" className="text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : balanceError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <div className="text-2xl font-bold">
                {balanceData ? `${Number(balanceData.formatted).toFixed(4)} ${balanceData.symbol}` : '0 ETH'}
              </div>
            )}
            <div className="text-sm text-gray-500">Balance</div>
          </div>
          <div className="text-center">
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : nftBalanceError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <div className="text-2xl font-bold">{nftCount !== null ? nftCount : '0'}</div>
            )}
            <div className="text-sm text-gray-500">Owned</div>
          </div>
          <div className="text-center">
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : listedNftsError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <div className="text-2xl font-bold">{myListedNfts ? myListedNfts.length : '0'}</div>
            )}
            <div className="text-sm text-gray-500">On Sale</div>
          </div>
        </div>
      </div>
    </div>
  )
} 