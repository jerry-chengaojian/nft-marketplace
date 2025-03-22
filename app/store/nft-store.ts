import { create } from 'zustand'

type NFTMetadata = {
  name: string
  description: string
  image: string
  external_url: string
  attributes: {
    trait_type: string
    value: string
  }[]
  address: string
  price: string
}

type NFTStore = {
  metadata: Record<string, NFTMetadata>
  setMetadata: (tokenId: string, data: NFTMetadata) => void
}

export const useNFTStore = create<NFTStore>((set) => ({
  metadata: {},
  setMetadata: (tokenId, data) => 
    set((state) => ({
      metadata: {
        ...state.metadata,
        [tokenId]: data
      }
    }))
})) 