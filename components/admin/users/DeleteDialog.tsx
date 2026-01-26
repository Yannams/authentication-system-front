"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  onConfirm: () => void
}

export default function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Supprimer cet utilisateur ?
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Cette action est irréversible.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Supprimer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
