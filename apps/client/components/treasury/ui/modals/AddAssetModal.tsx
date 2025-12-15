
// ------------------------------------------------------------
// components/treasury/ui/modals/AddAssetModal.tsx

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AddAssetForm } from '../forms/AddAssetForm'

interface AddAssetModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddAssetModal({ isOpen, onClose }: AddAssetModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Treasury Asset</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Register a new asset for treasury tracking and governance operations
          </p>
        </DialogHeader>

        <AddAssetForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
