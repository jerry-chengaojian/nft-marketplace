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

### 1. CollectibleNFT (ERC721)
A customized ERC721 token that implements:
- **ERC721Enumerable**: Enables on-chain enumeration of all tokens
- **ERC721URIStorage**: Stores token metadata URIs
- **Ownable**: Provides basic access control

Key features:
- Custom minting function that returns the token ID
- Metadata storage for each NFT (IPFS links)
- Full compatibility with marketplace operations

### 2. USDTCoin (ERC20)
A simple ERC20 token that simulates USDT for the marketplace:
- Initial supply of 1 million tokens
- Standard ERC20 functionality
- Used as the payment currency for all NFT transactions

### 3. Market
A comprehensive marketplace contract that manages all NFT trading operations:

Key features:
- **Listing Management**: Users can list NFTs for sale with custom prices
- **Trading Functionality**: Handles buying, selling, and price updates
- **Fee System**: Configurable marketplace fee (default 2.5%)
- **Security Features**:
  - Reentrancy protection
  - Access control for admin functions
  - Emergency withdrawal functionality
- **Order Tracking**: Maintains on-chain records of all listings
- **Query Functions**: Provides methods to retrieve marketplace data

The Market contract implements:
- **IERC721Receiver**: Allows direct NFT transfers for listing
- **Ownable**: Restricts administrative functions

All contracts are deployed on the Sepolia testnet and are fully verified on Etherscan.

## Key Features

### NFT Creation
Users can upload images to IPFS and mint them as NFTs with metadata including:
- Title and detailed description
- Category selection from predefined options (Art, Collectibles, Music, Photography, etc.)
- Custom tags for better discoverability
- Support for multiple file formats (PNG, JPG, GIF, SVG, MP4, WEBM)
- Automatic metadata generation and IPFS storage
- Network validation to ensure proper blockchain connection

### NFT Marketplace
The marketplace allows users to:
- Browse NFTs with a visually appealing grid layout
- Filter NFTs by categories (Art, Collectibles, Music, Photography, etc.)
- Sort and filter listings by various criteria
- View recently listed NFTs in a sidebar
- List NFTs for sale with custom prices
- Update listing prices
- Cancel listings
- Purchase NFTs using USDT

### User Collection Management
Users can view and manage their NFTs in three categories:

#### Owned NFTs
- View all NFTs currently owned with detailed metadata
- See NFT images, titles, descriptions, and tags
- List NFTs for sale directly from the collection view
- Set custom prices in USDT when listing
- Responsive grid layout with visual previews

#### NFTs Listed for Sale
- Monitor all active marketplace listings
- View current listing prices
- Edit listing prices with real-time blockchain updates
- Cancel listings to return NFTs to your wallet
- Visual confirmation of all marketplace actions

#### Activity Tracking
- Comprehensive transaction history for all NFT activities
- Track transfers, approvals, and collection approvals
- Real-time event monitoring using blockchain events
- Time-based sorting of activities
- Visual indicators for different transaction types
- User-friendly timestamps showing relative time

The collection management interface features:
- Tabbed navigation for easy switching between views
- Wallet connection validation
- Loading states and error handling
- Empty state messaging with clear calls to action
- Responsive design for all screen sizes

### Wallet Integration
Seamless wallet connection using RainbowKit with:
- Support for multiple wallets and networks
- Automatic network switching when needed
- Clear connection status indicators
- Secure transaction signing

### User Interface
- Responsive design that works on mobile and desktop
- Modern, clean aesthetic with gradient accents
- Intuitive navigation and clear call-to-action buttons
- Real-time feedback for all blockchain interactions
- Comprehensive notification system for transaction updates

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
- Comprehensive error handling for blockchain interactions
- Network detection and automatic switching functionality
- Optimized image loading and preview capabilities
- Real-time blockchain event monitoring for user activities
- Comprehensive error handling for all blockchain interactions
- Automatic query invalidation to ensure data freshness
- Network detection and automatic switching functionality
- Optimized image loading and preview capabilities
- Transaction confirmation feedback with detailed notifications

## Future Improvements

- Add search and filtering functionality
- Implement auctions and bidding
- Add royalties for creators
- Enhance user profiles and social features
- Support for multiple payment tokens