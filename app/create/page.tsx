import { CreateNFTForm } from './components/create-nft-form'

export default function CreatePage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create New NFT</h1>
      <CreateNFTForm />
    </main>
  )
} 