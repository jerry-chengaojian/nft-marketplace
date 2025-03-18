# NFT Marketplace DApp

A full-stack decentralized NFT marketplace built with Next.js, TypeScript, and Ethereum smart contracts.

## Overview

This project is a complete NFT marketplace that allows users to:

- Create and mint new NFTs
- List NFTs for sale
- Buy NFTs with USDT
- Manage their NFT collection
- Track transaction activity

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Shadcn UI** for component library
- **RainbowKit** for wallet connection
- **Wagmi** for blockchain interactions
- **Viem** for Ethereum data types and utilities

### Blockchain
- **Solidity** smart contracts
- **OpenZeppelin** for contract standards
- **Hardhat** for local development
- **Sepolia** testnet for production deployment

## Smart Contracts

The project includes three main smart contracts:

1. **CollectibleNFT (ERC721)**: Handles NFT creation and ownership
2. **USDTCoin (ERC20)**: Simulates USDT for transactions
3. **Market**: Manages NFT listings, sales, and fees

## Key Features

### NFT Creation
Users can upload images to IPFS and mint them as NFTs with metadata including title, description, category, and tags.

### NFT Marketplace
The marketplace allows users to:
- List NFTs for sale with custom prices
- Update listing prices
- Cancel listings
- Purchase NFTs using USDT

### User Collection Management
Users can view and manage their NFTs in three categories:
- Owned NFTs
- NFTs listed for sale
- Transaction activity

### Wallet Integration
Seamless wallet connection using RainbowKit with support for multiple wallets and networks.

## Security Features

- Protection against reentrancy attacks
- Proper access control for admin functions
- Fee management system with configurable rates
- Emergency withdrawal functionality
- Comprehensive error handling

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js application code
  - `/components`: React components
  - `/utils`: Utility functions and contract hooks
  - `/create`: NFT creation page
  - `/my-collection`: User collection management
- `/contracts`: Solidity smart contracts
  - `erc721-nft.sol`: NFT contract
  - `erc20-usdt.sol`: Token contract
  - `nft-market.sol`: Marketplace contract
- `/public`: Static assets

## Development Notes

- The project uses environment-specific configurations for local development (Hardhat) and production (Sepolia)
- IPFS integration for decentralized storage of NFT images and metadata
- Responsive design for mobile and desktop users

## Future Improvements

- Add search and filtering functionality
- Implement auctions and bidding
- Add royalties for creators
- Enhance user profiles and social features
- Support for multiple payment tokens