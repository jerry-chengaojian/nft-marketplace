import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { NFTContent } from './components/ntf-content';
import { RecentlyListedNFTs } from './components/recently-listed-nfts';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-10 flex items-center mx-8 mt-8">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-white mb-4">Discover, Collect, and Sell Extraordinary NFTs</h1>
          <p className="text-indigo-100 mb-6">Explore the best digital art and collectibles on the Celo blockchain</p>
          <div className="flex space-x-4">
            <Button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Explore Collection
            </Button>
            <Link href="/create">
              <Button variant="outline" className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Create NFT
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 pl-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="transform rotate-3 shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Featured NFT 1"
                width={500}
                height={400}
                className="rounded-lg h-40 w-full object-cover"
              />
            </div>
            <div className="transform -rotate-3 shadow-lg mt-6">
              <Image 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Featured NFT 2"
                width={500}
                height={400}
                className="rounded-lg h-40 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {/* Main Content */}
        <NFTContent />
        
        {/* Sidebar */}
        <RecentlyListedNFTs />
      </div>
    </div>
  );
}