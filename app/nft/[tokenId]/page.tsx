import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, Share, ExternalLink } from 'lucide-react'

// Mock data for the NFT detail page
const mockNftData = {
  id: '42',
  name: 'Cosmic Perspective #42',
  description: '"Cosmic Perspective #42" explores the relationship between humanity and the vast universe. This digital artwork combines elements of space photography with abstract digital painting to create a unique perspective on our place in the cosmos.\n\nEach piece in this collection represents a different viewpoint on the universe, with #42 specifically focusing on the beauty of nebulae and star formation.',
  image: '/public/images/cosmic_perspective_42.jpg',
  creator: {
    name: '@cosmic_artist',
    avatar: '/public/images/cosmic_artist_avatar.jpg',
    verified: true
  },
  owner: {
    name: '@cosmic_artist',
    avatar: '/public/images/cosmic_artist_avatar.jpg'
  },
  collection: {
    name: 'Cosmic Perspectives',
    image: '/public/images/cosmic_perspectives_collection.jpg'
  },
  price: {
    amount: '2.5',
    currency: 'USDT',
    usdEquivalent: '2.50'
  },
  auction: {
    endTime: '23h 14m 05s'
  },
  tags: ['Art', 'Space'],
  details: {
    contractAddress: '0x1a2b...3c4d',
    tokenId: '42',
    tokenStandard: 'ERC-721',
    blockchain: 'Celo',
    feePercentage: '10%',
    created: '7 days ago'
  },
  history: [
    {
      type: 'listed',
      icon: 'sell',
      time: '2 days ago',
      price: '2.5 USDT'
    },
    {
      type: 'transfer',
      icon: 'swap_horiz',
      time: '5 days ago',
      from: '@dream_creator'
    },
    {
      type: 'minted',
      icon: 'add_circle',
      time: '7 days ago',
      price: '2.3 USDT'
    }
  ],
  relatedNfts: [
    {
      id: '43',
      image: '/public/images/related_nft_43.jpg'
    },
    {
      id: '44',
      image: '/public/images/related_nft_44.jpg'
    },
    {
      id: '45',
      image: '/public/images/related_nft_45.jpg'
    }
  ]
}

export default function NftDetailPage({ params }: { params: { tokenId: string } }) {
  // In a real app, you would fetch the NFT data based on the tokenId
  const nft = mockNftData;
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to marketplace</span>
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - NFT Image and Additional Info */}
          <div className="w-full lg:w-[45%]">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={nft.image} 
                alt={nft.name}
                width={1000}
                height={1000}
                className="w-full h-[450px] object-cover"
              />
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Add to Favorites</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          {/* Right Column - NFT Details */}
          <div className="w-full lg:w-[55%]">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{nft.name}</h1>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {nft.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-gray-500">Current Price</div>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold">{nft.price.amount} {nft.price.currency}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                  Buy Now
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="text-gray-500 text-sm">Owner</div>
                <div className="flex items-center mt-2">
                  <span className="font-medium">{nft.owner.name}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Description</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {nft.description}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">Details</h2>
                <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0 h-auto flex items-center">
                  View on blockchain
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-xl p-4 shadow-sm">
                {Object.entries(nft.details).map(([key, value], index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <div className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                    <div className="text-gray-900 font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 