'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart4Icon,
  PlusIcon,
  RepeatIcon,
  WalletIcon,
} from 'lucide-react'
import { useState } from 'react'
import DepositFundsModal from '../modals/DepositFundsModal'
import RebalancePortfolioModal from '../modals/RebalancePortfolioModal'
import SwapAssetsModal from '../modals/SwapAssetsModal'
import TransferFundsModal from '../modals/TransferFundsModal'
import AddAssetModal from '../modals/AddAssetModal'

export default function AssetManagementPanel() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (modalName: string) => setActiveModal(modalName)
  const closeModal = () => setActiveModal(null)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Asset Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Control treasury assets
          </p>
        </div>

        <Button size="sm" onClick={() => openModal('add-asset')}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </CardHeader>

      <CardContent className="px-0">
        <Tabs defaultValue="quick-actions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="p-6">
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-10 text-center">
              <WalletIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Asset list & balances will appear here
              </p>
            </div>
          </TabsContent>

			<TabsContent value="quick-actions" className="p-4">
					<div className="grid grid-cols-1 gap-4">
						{/* Deposit Funds */}
						<button
							type="button"
							className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer w-full text-left"
							onClick={() => openModal('deposit')}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') openModal('deposit')
							}}
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
								<ArrowDownIcon className="h-5 w-5" />
							</div>
							<div>
								<h4 className="font-medium">Deposit Funds</h4>
								<p className="text-sm text-muted-foreground">Add assets to the treasury</p>
							</div>
						</button>

						{/* Transfer Funds */}
						<button
							type="button"
							className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer w-full text-left"
							onClick={() => openModal('transfer')}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') openModal('transfer')
							}}
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20">
								<ArrowUpIcon className="h-5 w-5" />
							</div>
							<div>
								<h4 className="font-medium">Transfer Funds</h4>
								<p className="text-sm text-muted-foreground">Send assets to another account</p>
							</div>
						</button>

						{/* Swap Assets */}
						<button
							type="button"
							className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer w-full text-left"
							onClick={() => openModal('swap')}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') openModal('swap')
							}}
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/20">
								<RepeatIcon className="h-5 w-5" />
							</div>
							<div>
								<h4 className="font-medium">Swap Assets</h4>
								<p className="text-sm text-muted-foreground">Exchange one asset for another</p>
							</div>
						</button>

						{/* Rebalance Portfolio */}
						<button
							type="button"
							className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer w-full text-left"
							onClick={() => openModal('rebalance')}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') openModal('rebalance')
							}}
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20">
								<BarChart4Icon className="h-5 w-5" />
							</div>
							<div>
								<h4 className="font-medium">Rebalance Portfolio</h4>
								<p className="text-sm text-muted-foreground">Adjust asset allocation</p>
							</div>
						</button>
					</div>
				</TabsContent>
        </Tabs>
      </CardContent>

      {/* Modals */}
      <DepositFundsModal isOpen={activeModal === 'deposit'} onClose={closeModal} />
      <TransferFundsModal isOpen={activeModal === 'transfer'} onClose={closeModal} />
      <SwapAssetsModal isOpen={activeModal === 'swap'} onClose={closeModal} />
      <RebalancePortfolioModal isOpen={activeModal === 'rebalance'} onClose={closeModal} />
      <AddAssetModal isOpen={activeModal === 'add-asset'} onClose={closeModal} />
    </Card>
  )
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 rounded-lg border p-4 text-left transition hover:bg-accent"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}