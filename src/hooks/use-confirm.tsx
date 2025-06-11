import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import React, { JSX, useState } from 'react'

export const useConfirm = (
  title: string,
  message: string,
):  [() => JSX.Element, () => Promise<unknown>] => { // what it will return
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve});
  });

  const handleClose = () => {
    setPromise(null);
  }

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  }

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  }

  const confirmDialog = () => {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogDescription>
              {message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleCancel}
              variant={'outline'}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return [confirmDialog, confirm];
}
