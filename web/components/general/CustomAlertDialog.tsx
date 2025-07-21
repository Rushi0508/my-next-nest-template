import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/general/LoadingButton';

interface DeleteAlertDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmButtonClassName?: string;
}

export function CustomAlertDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  cancelText,
  confirmText,
  confirmButtonClassName,
}: DeleteAlertDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-sm:max-w-sm max-sm:rounded-lg'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='max-sm:flex-col max-sm:gap-2'>
          {cancelText && (
            <Button variant='outline' disabled={isLoading} onClick={onClose}>
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <LoadingButton
              disabled={isLoading}
              onClick={onConfirm}
              className={confirmButtonClassName}
              isLoading={isLoading}
            >
              {confirmText}
            </LoadingButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
