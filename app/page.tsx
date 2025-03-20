import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { NFTContent } from './components/ntf-content';

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
            <Button variant="outline" className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Create NFT
            </Button>
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
        <div className="hidden lg:block w-80 border-l border-gray-100 p-6 bg-white">
          <h2 className="text-lg font-bold mb-4">Recently Listed</h2>
          
          <div className="space-y-4">
            <Link href="#nft-detail" className="block">
              <Card className="bg-white p-3 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                <CardContent className="p-0 flex items-center">
                  <div className="relative w-16 h-16 rounded-lg mr-3 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e" 
                      alt="Abstract Motion #15"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Abstract Motion #15</h3>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500">Listed 2h ago</div>
                      <div className="text-sm font-semibold">3.2 USDT</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="#nft-detail" className="block">
              <Card className="bg-white p-3 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                <CardContent className="p-0 flex items-center">
                  <div className="relative w-16 h-16 rounded-lg mr-3 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1633101585272-9e0b0c3d9392" 
                      alt="Pixel Universe #27"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Pixel Universe #27</h3>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500">Listed 5h ago</div>
                      <div className="text-sm font-semibold">1.5 USDT</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="#nft-detail" className="block">
              <Card className="bg-white p-3 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                <CardContent className="p-0 flex items-center">
                  <div className="relative w-16 h-16 rounded-lg mr-3 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1612336307429-8a898d10e223" 
                      alt="Neon Dreamscape #12"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Neon Dreamscape #12</h3>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500">Listed 8h ago</div>
                      <div className="text-sm font-semibold">4.0 USDT</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}