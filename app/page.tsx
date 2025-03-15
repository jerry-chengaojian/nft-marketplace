import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Search, Bell, Filter, SortDesc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
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
              className="w-64 pl-10 pr-4 rounded-xl"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <ConnectButton accountStatus="address" showBalance={false} />
        </div>
      </header>

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
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">All NFTs</h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <SortDesc className="h-4 w-4" />
                <span>Sort by: Recent</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-transparent">
              <TabsTrigger value="all" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">All NFTs</TabsTrigger>
              <TabsTrigger value="art" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Art</TabsTrigger>
              <TabsTrigger value="collectibles" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Collectibles</TabsTrigger>
              <TabsTrigger value="music" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Music</TabsTrigger>
              <TabsTrigger value="photography" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Photography</TabsTrigger>
              <TabsTrigger value="virtual" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Virtual Worlds</TabsTrigger>
              <TabsTrigger value="sports" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-5 py-2 mr-3">Sports</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">All NFTs</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* NFT Card 1 */}
              <Link href="#nft-detail">
                <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="relative h-48 w-full">
                    <Image 
                      src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d" 
                      alt="Cosmic Perspective #42"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">Cosmic Perspective #42</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">0x71C...8a3F</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-gray-500">Current Price</div>
                      <div className="text-sm font-semibold">2.5 USDT</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* NFT Card 2 */}
              <Link href="#nft-detail">
                <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="relative h-48 w-full">
                    <Image 
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" 
                      alt="Digital Dreams #08"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">Digital Dreams #08</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">0x3eA...F42b</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-gray-500">Current Price</div>
                      <div className="text-sm font-semibold">1.8 USDT</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* NFT Card 3 */}
              <Link href="#nft-detail">
                <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="relative h-48 w-full">
                    <Image 
                      src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e" 
                      alt="Abstract Motion #15"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">Abstract Motion #15</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">0x8dF...1c7E</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-gray-500">Current Price</div>
                      <div className="text-sm font-semibold">3.2 USDT</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* NFT Card 4 */}
              <Link href="#nft-detail">
                <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="relative h-48 w-full">
                    <Image 
                      src="https://images.unsplash.com/photo-1633101585272-9e0b0c3d9392" 
                      alt="Pixel Universe #27"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">Pixel Universe #27</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">0x42A...9bD1</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-gray-500">Current Price</div>
                      <div className="text-sm font-semibold">1.5 USDT</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
        
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