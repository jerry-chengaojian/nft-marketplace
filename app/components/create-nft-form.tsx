'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X, ChevronDown } from 'lucide-react'

export function CreateNFTForm() {
  const [tags, setTags] = useState<string[]>(['Digital Art', 'Space', 'Abstract'])
  const [newTag, setNewTag] = useState('')
  const [category, setCategory] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center h-64 flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <div className="text-gray-500 mb-4">
              PNG, JPG, GIF, SVG, MP4, WEBM<br/>Max 100MB
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Choose File</Button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div className="border border-gray-200 rounded-xl p-4 h-64 flex items-center justify-center bg-gray-50">
            <span className="text-gray-400">Upload file to preview</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input type="text" placeholder="e.g. Cosmic Dreams #1" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <Textarea placeholder="Tell the story of your NFT..." rows={4} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (USDT)</label>
            <Input type="number" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Royalties (%)</label>
            <Input type="number" placeholder="10" />
          </div>
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
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" size="lg">
          Create NFT
        </Button>
      </div>
    </div>
  )
} 