import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SortDesc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function NFTContent() {
  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* NFT Cards */}
          <NFTCard
            href="#nft-detail"
            image="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
            title="Cosmic Perspective #42"
            address="0x71C...8a3F"
            price="2.5"
          />
          <NFTCard
            href="#nft-detail"
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
            title="Digital Dreams #08"
            address="0x3eA...F42b"
            price="1.8"
          />
          <NFTCard
            href="#nft-detail"
            image="https://images.unsplash.com/photo-1614583225154-5fcdda07019e"
            title="Abstract Motion #15"
            address="0x8dF...1c7E"
            price="3.2"
          />
          <NFTCard
            href="#nft-detail"
            image="https://images.unsplash.com/photo-1633101585272-9e0b0c3d9392"
            title="Pixel Universe #27"
            address="0x42A...9bD1"
            price="1.5"
          />
        </div>
      </div>
    </div>
  );
}

interface NFTCardProps {
  href: string;
  image: string;
  title: string;
  address: string;
  price: string;
}

function NFTCard({ href, image, title, address, price }: NFTCardProps) {
  return (
    <Link href={href}>
      <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:translate-y-[-4px]">
        <div className="relative h-48 w-full">
          <Image 
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">{address}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-gray-500">Current Price</div>
            <div className="text-sm font-semibold">{price} USDT</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
