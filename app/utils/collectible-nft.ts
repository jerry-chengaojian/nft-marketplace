import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CollectibleNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 
 */
export const collectibleNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'uri', internalType: 'string', type: 'string' },
    ],
    name: 'safeMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 
 */
export const collectibleNftAddress = {
  31337: process.env.NEXT_PUBLIC_COLLECTIBLE_NFT_ADDRESS as `0x${string}`,
  5: process.env.NEXT_PUBLIC_COLLECTIBLE_NFT_ADDRESS as `0x${string}`,
} as const

/**
 
 */
export const collectibleNftConfig = {
  address: collectibleNftAddress,
  abi: collectibleNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__
 *
 
 */
export const useReadCollectibleNft = /*#__PURE__*/ createUseReadContract({
  abi: collectibleNftAbi,
  address: collectibleNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 
 */
export const useReadCollectibleNftBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"getApproved"`
 *
 
 */
export const useReadCollectibleNftGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 
 */
export const useReadCollectibleNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"name"`
 *
 
 */
export const useReadCollectibleNftName = /*#__PURE__*/ createUseReadContract({
  abi: collectibleNftAbi,
  address: collectibleNftAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"owner"`
 *
 
 */
export const useReadCollectibleNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: collectibleNftAbi,
  address: collectibleNftAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"ownerOf"`
 *
 
 */
export const useReadCollectibleNftOwnerOf = /*#__PURE__*/ createUseReadContract(
  {
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'ownerOf',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 
 */
export const useReadCollectibleNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"symbol"`
 *
 
 */
export const useReadCollectibleNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: collectibleNftAbi,
  address: collectibleNftAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 
 */
export const useReadCollectibleNftTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 
 */
export const useReadCollectibleNftTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"tokenURI"`
 *
 
 */
export const useReadCollectibleNftTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"totalSupply"`
 *
 
 */
export const useReadCollectibleNftTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__
 *
 
 */
export const useWriteCollectibleNft = /*#__PURE__*/ createUseWriteContract({
  abi: collectibleNftAbi,
  address: collectibleNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"approve"`
 *
 
 */
export const useWriteCollectibleNftApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 
 */
export const useWriteCollectibleNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"safeMint"`
 *
 
 */
export const useWriteCollectibleNftSafeMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'safeMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 
 */
export const useWriteCollectibleNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 
 */
export const useWriteCollectibleNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"transferFrom"`
 *
 
 */
export const useWriteCollectibleNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 
 */
export const useWriteCollectibleNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__
 *
 
 */
export const useSimulateCollectibleNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"approve"`
 *
 
 */
export const useSimulateCollectibleNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 
 */
export const useSimulateCollectibleNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"safeMint"`
 *
 
 */
export const useSimulateCollectibleNftSafeMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'safeMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 
 */
export const useSimulateCollectibleNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 
 */
export const useSimulateCollectibleNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"transferFrom"`
 *
 
 */
export const useSimulateCollectibleNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link collectibleNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 
 */
export const useSimulateCollectibleNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__
 *
 
 */
export const useWatchCollectibleNftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__ and `eventName` set to `"Approval"`
 *
 
 */
export const useWatchCollectibleNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 
 */
export const useWatchCollectibleNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 *
 
 */
export const useWatchCollectibleNftBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__ and `eventName` set to `"MetadataUpdate"`
 *
 
 */
export const useWatchCollectibleNftMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 
 */
export const useWatchCollectibleNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link collectibleNftAbi}__ and `eventName` set to `"Transfer"`
 *
 
 */
export const useWatchCollectibleNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: collectibleNftAbi,
    address: collectibleNftAddress,
    eventName: 'Transfer',
  })
