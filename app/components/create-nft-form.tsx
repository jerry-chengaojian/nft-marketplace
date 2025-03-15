'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { useAccount, useSwitchChain } from 'wagmi'
import { useWriteCollectibleNftSafeMint } from '@/app/utils/collectible-nft'
import { hardhat, sepolia } from 'wagmi/chains'

export function CreateNFTForm() {
  const { address, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const { writeContract: safeMint, isPending } = useWriteCollectibleNftSafeMint()
  const [tags, setTags] = useState<string[]>(['Digital Art', 'Space', 'Abstract'])
  const [newTag, setNewTag] = useState('')
  const [category, setCategory] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const categories = [
    { value: 'art', label: 'Art' },
    { value: 'collectibles', label: 'Collectibles' },
    { value: 'music', label: 'Music' },
    { value: 'photography', label: 'Photography' },
    { value: 'virtual-worlds', label: 'Virtual Worlds' },
    { value: 'sports', label: 'Sports' },
    { value: 'utility', label: 'Utility' },
  ]

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const selectCategory = (value: string, label: string) => {
    setCategory(value)
    setIsDropdownOpen(false)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm']
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Invalid File Type', {
        description: 'Please upload PNG, JPG, GIF, SVG, MP4, or WEBM',
        position: 'top-right'
      })
      return
    }
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error('File Too Large', {
        description: 'Maximum file size is 100MB',
      })
      return
    }

    try {
      setIsUploading(true)
      // Upload to IPFS first
      const result = await uploadToIPFS(selectedFile)
      const ipfsHash = result.path
      const ipfsGatewayUrl = `${process.env.NEXT_PUBLIC_IPFS_URL}:8080/ipfs/${ipfsHash}`
      
      setIpfsUrl(ipfsGatewayUrl)
    } catch (error) {
      console.error('Error handling file:', error)
      toast.error('Error', {
        description: 'Failed to upload file to IPFS. Please try again.',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const uploadToIPFS = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${process.env.NEXT_PUBLIC_IPFS_URL}:5001/api/v0/add`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return { path: result.Hash }
    } catch (error) {
      console.error('Error uploading to IPFS:', error)
      throw new Error('Failed to upload to IPFS')
    }
  }

  const handleCreateNFT = async () => {
    if (!ipfsUrl || !title || !description || !category || !address) {
      toast.error('Validation Error', {
        description: 'Please fill in all required fields and connect your wallet',
        position: 'top-right'
      })
      return
    }

    // Check if user is on the correct network based on environment
    const supportedChainId = process.env.NODE_ENV === 'production' ? sepolia.id : hardhat.id
    
    if (chainId !== supportedChainId) {
      const networkName = process.env.NODE_ENV === 'production' ? 'Sepolia' : 'Hardhat'
      toast.error('Network Error', {
        description: `Please switch to the ${networkName} network to mint NFTs`,
        position: 'top-right'
      })
      
      // Offer to switch networks automatically
      try {
        await switchChain({ chainId: supportedChainId })
        return
      } catch (error) {
        console.error('Failed to switch network:', error)
        return
      }
    }

    try {
      const metadata = {
        image: ipfsUrl,
        title,
        description,
        category,
        tags: tags,
      }

      const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      const file = new File([blob], 'metadata.json')
      const result = await uploadToIPFS(file)
      
      const metadataUrl = `${process.env.NEXT_PUBLIC_IPFS_URL}:8080/ipfs/${result.path}`
      
      // Call safeMint function
      safeMint({
        args: [address, metadataUrl],
      }, {
        onSuccess: (data) => {
          toast.success('NFT Created Successfully!', {
            description: 'Your NFT has been minted and metadata uploaded to IPFS.',
            position: 'top-right'
          })
          // Reset form
          setTitle('')
          setDescription('')
          setCategory('')
          setTags([])
          setIpfsUrl(null)
        },
        onError: (error: Error) => {
          console.error('Error minting NFT:', error)
          toast.error('Failed to Mint NFT', {
            description: 'There was an error while minting your NFT. Please try again.',
            position: 'top-right'
          })
        }
      })
      
    } catch (error) {
      console.error('Error creating NFT:', error)
      toast.error('Error', {
        description: 'Failed to create NFT. Please try again.',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="mb-6">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
            accept=".png,.jpg,.jpeg,.gif,.svg,.mp4,.webm"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center h-64 flex flex-col items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <div className="text-gray-500 mb-4">
              PNG, JPG, GIF, SVG, MP4, WEBM<br/>Max 100MB
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Choose File'}
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div className="border border-gray-200 rounded-xl p-4 h-64 flex items-center justify-center bg-gray-50">
            {isUploading ? (
              <div className="text-gray-400">Uploading to IPFS...</div>
            ) : ipfsUrl ? (
              <img 
                src={ipfsUrl} 
                alt="IPFS Preview" 
                className="max-h-full max-w-full object-contain" 
              />
            ) : (
              <span className="text-gray-400">Upload file to preview</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input 
            type="text" 
            placeholder="e.g. Cosmic Dreams #1" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <Textarea 
            placeholder="Tell the story of your NFT..." 
            rows={4} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div 
            className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className={category ? 'text-gray-900' : 'text-gray-400'}>
              {category ? categories.find(c => c.value === category)?.label : 'Select category'}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1 max-h-60 overflow-auto">
                {categories.map((cat) => (
                  <li 
                    key={cat.value}
                    className="px-3 py-2 hover:bg-indigo-100 cursor-pointer text-gray-900"
                    onClick={() => selectCategory(cat.value, cat.label)}
                  >
                    {cat.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <Input 
            type="text" 
            placeholder="Add tags..." 
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={addTag}
          />
        </div>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" 
          size="lg"
          onClick={handleCreateNFT}
          disabled={isPending}
        >
          {isPending ? 'Creating NFT...' : 'Create NFT'}
        </Button>
      </div>
    </div>
  )
} 