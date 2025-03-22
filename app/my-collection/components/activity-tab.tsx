"use client"

import { useState } from "react"
import { useAccount, useBlockNumber, usePublicClient } from "wagmi"
import { formatDistanceToNow } from "date-fns"
import { ArrowRightLeft, Check, AlertCircle } from "lucide-react"
import { 
  useWatchCollectibleNftTransferEvent,
  useWatchCollectibleNftApprovalEvent,
  useWatchCollectibleNftApprovalForAllEvent
} from "@/app/utils/collectible-nft"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ActivityEvent = {
  id: string
  type: 'transfer' | 'approval' | 'approvalForAll'
  timestamp: number
  data: any
}

export default function ActivityTab() {
  const { address } = useAccount()
  const { data: blockNumber } = useBlockNumber()
  const publicClient = usePublicClient()
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Watch for Transfer events
  useWatchCollectibleNftTransferEvent({
    fromBlock: blockNumber && blockNumber >= BigInt(1000) ? blockNumber - BigInt(1000) : BigInt(0),
    onLogs: async (logs) => {
      try {
        const newEvents = await Promise.all(logs.map(async (log) => {
          const timestamp = publicClient 
            ? Number((await publicClient.getBlock({ blockNumber: log.blockNumber })).timestamp) * 1000
            : Date.now();
          return {
            id: `transfer-${log.transactionHash}-${log.logIndex}`,
            type: 'transfer' as const,
            timestamp: timestamp,
            data: {
              from: log.args.from,
              to: log.args.to,
              tokenId: log.args.tokenId
            }
          }
        }))

        // Filter out duplicate events
        const uniqueNewEvents = newEvents.filter(newEvent => 
          !events.some(existingEvent => 
            existingEvent.id === newEvent.id
          )
        )

        setEvents(prev => [...uniqueNewEvents, ...prev].slice(0, 50))
        setIsLoading(false)
      } catch (error) {
        console.error("Error processing transfer events:", error)
        setIsLoading(false)
      }
    },
    onError: (error) => {
      console.error("Error watching transfer events:", error)
      setIsLoading(false)
    }
  })

  // Watch for Approval events
  useWatchCollectibleNftApprovalEvent({
    fromBlock: blockNumber && blockNumber >= BigInt(1000) ? blockNumber - BigInt(1000) : BigInt(0),
    onLogs: async (logs) => {
      try {
        const newEvents = await Promise.all(logs.map(async (log) => {
          const timestamp = publicClient 
            ? Number((await publicClient.getBlock({ blockNumber: log.blockNumber })).timestamp) * 1000
            : Date.now();
          return {
            id: `approval-${log.transactionHash}-${log.logIndex}`,
            type: 'approval' as const,
            timestamp,
            data: {
              owner: log.args.owner,
              approved: log.args.approved,
              tokenId: log.args.tokenId
            }
          }
        }))

        const uniqueNewEvents = newEvents.filter(newEvent => 
          !events.some(existingEvent => 
            existingEvent.id === newEvent.id
          )
        )

        setEvents(prev => [...uniqueNewEvents, ...prev].slice(0, 50))
        setIsLoading(false)
      } catch (error) {
        console.error("Error processing approval events:", error)
        setIsLoading(false)
      }
    },
    onError: (error) => {
      console.error("Error watching approval events:", error)
      setIsLoading(false)
    }
  })

  // Watch for ApprovalForAll events
  useWatchCollectibleNftApprovalForAllEvent({
    fromBlock: blockNumber && blockNumber >= BigInt(1000) ? blockNumber - BigInt(1000) : BigInt(0),
    onLogs: async (logs) => {
      try {
        const newEvents = await Promise.all(logs.map(async (log) => {
          const timestamp = publicClient 
            ? Number((await publicClient.getBlock({ blockNumber: log.blockNumber })).timestamp) * 1000
            : Date.now();
          return {
            id: `approvalForAll-${log.transactionHash}-${log.logIndex}`,
            type: 'approvalForAll' as const,
            timestamp,
            data: {
              owner: log.args.owner,
              operator: log.args.operator,
              approved: log.args.approved
            }
          }
        }))

        const uniqueNewEvents = newEvents.filter(newEvent => 
          !events.some(existingEvent => 
            existingEvent.id === newEvent.id
          )
        )

        setEvents(prev => [...uniqueNewEvents, ...prev].slice(0, 50))
        setIsLoading(false)
      } catch (error) {
        console.error("Error processing approvalForAll events:", error)
        setIsLoading(false)
      }
    },
    onError: (error) => {
      console.error("Error watching approvalForAll events:", error)
      setIsLoading(false)
    }
  })

  // Filter events related to the current user and sort by timestamp
  const userEvents = events
    .filter(event => {
      if (!address) return false
      
      switch (event.type) {
        case 'transfer':
          return event.data.from === address || event.data.to === address
        case 'approval':
          return event.data.owner === address || event.data.approved === address
        case 'approvalForAll':
          return event.data.owner === address || event.data.operator === address
        default:
          return false
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp in descending order

  // Render event icon based on type
  const getEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'transfer':
        return <ArrowRightLeft className="h-4 w-4" />
      case 'approval':
      case 'approvalForAll':
        return <Check className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Render event title based on type and data
  const getEventTitle = (event: ActivityEvent) => {
    const { type, data } = event
    
    switch (type) {
      case 'transfer':
        if (data.from === address) return 'NFT Sent'
        if (data.to === address) return 'NFT Received'
        return 'NFT Transfer'
      
      case 'approval':
        if (data.owner === address) return 'Approval Granted'
        if (data.approved === address) return 'Received Approval'
        return 'NFT Approval'
      
      case 'approvalForAll':
        if (data.owner === address) return data.approved ? 'Collection Approval Granted' : 'Collection Approval Revoked'
        if (data.operator === address) return data.approved ? 'Received Collection Approval' : 'Lost Collection Approval'
        return 'Collection Approval'
      
      default:
        return 'Unknown Event'
    }
  }

  // Render event description based on type and data
  const getEventDescription = (event: ActivityEvent) => {
    const { type, data } = event
    const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
    
    switch (type) {
      case 'transfer':
        return `Token #${data.tokenId.toString()} from ${shortenAddress(data.from)} to ${shortenAddress(data.to)}`
      
      case 'approval':
        return `Token #${data.tokenId.toString()} approved to ${shortenAddress(data.approved)}`
      
      case 'approvalForAll':
        return `${data.approved ? 'Approved' : 'Revoked'} operator ${shortenAddress(data.operator)}`
      
      default:
        return ''
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500">Connect your wallet to view activity</p>
      </div>
    )
  }

  if (userEvents.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500">No recent activity to display</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      {userEvents.map((event) => (
        <Card key={event.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {getEventTitle(event)}
              </CardTitle>
              <Badge variant="outline" className="ml-2">
                {formatDistanceToNow(event.timestamp, { addSuffix: true })}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              {getEventDescription(event)}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2 text-sm">
              {getEventIcon(event.type)}
              <span className="text-muted-foreground">
                {event.type === 'transfer' ? 'Transfer' : 
                 event.type === 'approval' ? 'Token Approval' : 'Collection Approval'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 