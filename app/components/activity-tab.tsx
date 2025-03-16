"use client"

import { useState } from "react"
import { useAccount, useBlockNumber } from "wagmi"
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
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Watch for Transfer events
  useWatchCollectibleNftTransferEvent({
    onLogs: (logs) => {
      console.log("Approval events:", logs)

      const newEvents = logs.map(log => ({
        id: `transfer-${log.transactionHash}-${log.logIndex}`,
        type: 'transfer' as const,
        timestamp: Date.now(),
        data: {
          from: log.args.from,
          to: log.args.to,
          tokenId: log.args.tokenId
        }
      }));

      // 过滤掉已经存在的事件
      const uniqueNewEvents = newEvents.filter(newEvent => 
        !events.some(existingEvent => 
          existingEvent.id === newEvent.id
        )
      );

      // 更新事件状态
      setEvents(prev => [...uniqueNewEvents, ...prev].slice(0, 50));
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Error watching transfer events:", error);
      setIsLoading(false);
    }
  })

  // Watch for Approval events
  useWatchCollectibleNftApprovalEvent({
    onLogs: (logs) => {
      const newEvents = logs.map(log => ({
        id: `approval-${log.transactionHash}-${log.logIndex}`,
        type: 'approval' as const,
        timestamp: Date.now(),
        data: {
          owner: log.args.owner,
          approved: log.args.approved,
          tokenId: log.args.tokenId
        }
      }))
      
      // Filter out events that already exist
      const uniqueNewEvents = newEvents.filter(newEvent => 
        !events.some(existingEvent => 
          existingEvent.id === newEvent.id
        )
      );
      
      // Update events state
      setEvents(prev => [...uniqueNewEvents, ...prev].slice(0, 50))
      setIsLoading(false)
    },
    onError: (error) => {
      console.error("Error watching approval events:", error)
      setIsLoading(false)
    }
  })

  // Watch for ApprovalForAll events
  useWatchCollectibleNftApprovalForAllEvent({
    onLogs: (logs) => {
      const newEvents = logs.map(log => ({
        id: `approvalForAll-${log.transactionHash}-${log.logIndex}`,
        type: 'approvalForAll' as const,
        timestamp: Date.now(),
        data: {
          owner: log.args.owner,
          operator: log.args.operator,
          approved: log.args.approved
        }
      }))
      
      // Filter out events that already exist
      const uniqueNewEvents = newEvents.filter(newEvent => 
        !events.some(existingEvent => 
          existingEvent.id === newEvent.id
        )
      );
      
      // Update events state
      setEvents(prev => [...uniqueNewEvents, ...prev].slice(0, 50))
      setIsLoading(false)
    },
    onError: (error) => {
      console.error("Error watching approvalForAll events:", error)
      setIsLoading(false)
    }
  })

  // Filter events related to the current user
  const userEvents = events.filter(event => {
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