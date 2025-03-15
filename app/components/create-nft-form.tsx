'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, X } from 'lucide-react'

export function CreateNFTForm() {
  const [tags, setTags] = useState<string[]>(['Digital Art', 'Space', 'Abstract'])
  const [newTag, setNewTag] = useState('')

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
            <Button>Choose File</Button>
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
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="collectibles">Collectibles</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="virtual-worlds">Virtual Worlds</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="utility">Utility</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
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
        
        <Button className="w-full" size="lg">
          Create NFT
        </Button>
      </div>
    </div>
  )
} 