import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Market
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 
 */
export const marketAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_erc20', internalType: 'address', type: 'address' },
      { name: '_erc721', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
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
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Deal',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeePercentageChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'paused', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'MarketPaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewOrder',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OrderCancelled',
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
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'previousPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PriceChanged',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOrder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'changePrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'erc20',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'erc721',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllNFTs',
    outputs: [
      {
        name: '',
        internalType: 'struct Market.Order[]',
        type: 'tuple[]',
        components: [
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMyNFTs',
    outputs: [
      {
        name: '',
        internalType: 'struct Market.Order[]',
        type: 'tuple[]',
        components: [
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'getNFTsByOwner',
    outputs: [
      {
        name: '',
        internalType: 'struct Market.Order[]',
        type: 'tuple[]',
        components: [
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOrderLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'idToOrderIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'isListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'orderOfId',
    outputs: [
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'orders',
    outputs: [
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
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
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
      { name: '_feePercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_bytes', internalType: 'bytes', type: 'bytes' },
      { name: '_start', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'toUint256',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
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
export const marketAddress = {
  31337: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as `0x${string}`,
  11_155_111: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as `0x${string}`,
} as const

/**
 
 */
export const marketConfig = { address: marketAddress, abi: marketAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__
 *
 
 */
export const useReadMarket = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"erc20"`
 *
 
 */
export const useReadMarketErc20 = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'erc20',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"erc721"`
 *
 
 */
export const useReadMarketErc721 = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'erc721',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"feePercentage"`
 *
 
 */
export const useReadMarketFeePercentage = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'feePercentage',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"getAllNFTs"`
 *
 
 */
export const useReadMarketGetAllNfTs = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'getAllNFTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"getMyNFTs"`
 *
 
 */
export const useReadMarketGetMyNfTs = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'getMyNFTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"getNFTsByOwner"`
 *
 
 */
export const useReadMarketGetNfTsByOwner = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'getNFTsByOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"getOrderLength"`
 *
 
 */
export const useReadMarketGetOrderLength = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'getOrderLength',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"idToOrderIndex"`
 *
 
 */
export const useReadMarketIdToOrderIndex = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'idToOrderIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"isListed"`
 *
 
 */
export const useReadMarketIsListed = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'isListed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"orderOfId"`
 *
 
 */
export const useReadMarketOrderOfId = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'orderOfId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"orders"`
 *
 
 */
export const useReadMarketOrders = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'orders',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"owner"`
 *
 
 */
export const useReadMarketOwner = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"paused"`
 *
 
 */
export const useReadMarketPaused = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"toUint256"`
 *
 
 */
export const useReadMarketToUint256 = /*#__PURE__*/ createUseReadContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'toUint256',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__
 *
 
 */
export const useWriteMarket = /*#__PURE__*/ createUseWriteContract({
  abi: marketAbi,
  address: marketAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"buy"`
 *
 
 */
export const useWriteMarketBuy = /*#__PURE__*/ createUseWriteContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"cancelOrder"`
 *
 
 */
export const useWriteMarketCancelOrder = /*#__PURE__*/ createUseWriteContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'cancelOrder',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"changePrice"`
 *
 
 */
export const useWriteMarketChangePrice = /*#__PURE__*/ createUseWriteContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'changePrice',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"emergencyWithdraw"`
 *
 
 */
export const useWriteMarketEmergencyWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'emergencyWithdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"onERC721Received"`
 *
 
 */
export const useWriteMarketOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 
 */
export const useWriteMarketRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"setFeePercentage"`
 *
 
 */
export const useWriteMarketSetFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'setFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"setPaused"`
 *
 
 */
export const useWriteMarketSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'setPaused',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"transferOwnership"`
 *
 
 */
export const useWriteMarketTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__
 *
 
 */
export const useSimulateMarket = /*#__PURE__*/ createUseSimulateContract({
  abi: marketAbi,
  address: marketAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"buy"`
 *
 
 */
export const useSimulateMarketBuy = /*#__PURE__*/ createUseSimulateContract({
  abi: marketAbi,
  address: marketAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"cancelOrder"`
 *
 
 */
export const useSimulateMarketCancelOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'cancelOrder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"changePrice"`
 *
 
 */
export const useSimulateMarketChangePrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'changePrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"emergencyWithdraw"`
 *
 
 */
export const useSimulateMarketEmergencyWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'emergencyWithdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"onERC721Received"`
 *
 
 */
export const useSimulateMarketOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 
 */
export const useSimulateMarketRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"setFeePercentage"`
 *
 
 */
export const useSimulateMarketSetFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'setFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"setPaused"`
 *
 
 */
export const useSimulateMarketSetPaused =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'setPaused',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketAbi}__ and `functionName` set to `"transferOwnership"`
 *
 
 */
export const useSimulateMarketTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__
 *
 
 */
export const useWatchMarketEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: marketAbi,
  address: marketAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"Deal"`
 *
 
 */
export const useWatchMarketDealEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'Deal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"FeePercentageChanged"`
 *
 
 */
export const useWatchMarketFeePercentageChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'FeePercentageChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"MarketPaused"`
 *
 
 */
export const useWatchMarketMarketPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'MarketPaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"NewOrder"`
 *
 
 */
export const useWatchMarketNewOrderEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'NewOrder',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"OrderCancelled"`
 *
 
 */
export const useWatchMarketOrderCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'OrderCancelled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 
 */
export const useWatchMarketOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketAbi}__ and `eventName` set to `"PriceChanged"`
 *
 
 */
export const useWatchMarketPriceChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketAbi,
    address: marketAddress,
    eventName: 'PriceChanged',
  })
