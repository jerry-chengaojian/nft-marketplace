import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDTCoin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 
 */
export const usdtCoinAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
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
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
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
    name: 'symbol',
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
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 
 */
export const usdtCoinAddress = {
  31337: process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`,
  5: process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`,
} as const

/**
 
 */
export const usdtCoinConfig = {
  address: usdtCoinAddress,
  abi: usdtCoinAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__
 *
 
 */
export const useReadUsdtCoin = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"allowance"`
 *
 
 */
export const useReadUsdtCoinAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"balanceOf"`
 *
 
 */
export const useReadUsdtCoinBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"decimals"`
 *
 
 */
export const useReadUsdtCoinDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"name"`
 *
 
 */
export const useReadUsdtCoinName = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"symbol"`
 *
 
 */
export const useReadUsdtCoinSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"totalSupply"`
 *
 
 */
export const useReadUsdtCoinTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtCoinAbi}__
 *
 
 */
export const useWriteUsdtCoin = /*#__PURE__*/ createUseWriteContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"approve"`
 *
 
 */
export const useWriteUsdtCoinApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"transfer"`
 *
 
 */
export const useWriteUsdtCoinTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 
 */
export const useWriteUsdtCoinTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: usdtCoinAbi,
    address: usdtCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtCoinAbi}__
 *
 
 */
export const useSimulateUsdtCoin = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"approve"`
 *
 
 */
export const useSimulateUsdtCoinApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtCoinAbi,
    address: usdtCoinAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"transfer"`
 *
 
 */
export const useSimulateUsdtCoinTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtCoinAbi,
    address: usdtCoinAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 
 */
export const useSimulateUsdtCoinTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtCoinAbi,
    address: usdtCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtCoinAbi}__
 *
 
 */
export const useWatchUsdtCoinEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtCoinAbi,
  address: usdtCoinAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtCoinAbi}__ and `eventName` set to `"Approval"`
 *
 
 */
export const useWatchUsdtCoinApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtCoinAbi,
    address: usdtCoinAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtCoinAbi}__ and `eventName` set to `"Transfer"`
 *
 
 */
export const useWatchUsdtCoinTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtCoinAbi,
    address: usdtCoinAddress,
    eventName: 'Transfer',
  })
