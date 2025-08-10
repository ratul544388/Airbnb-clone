"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteProperty } from "../actions";

export const DeletePropertyModal = () => {
  const { open, type, data, onClose } = useModalStore();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      if (!data?.id) return;
      try {
        const { message, success } = await deleteProperty(data.id);
        if (success) {
          toast.success(message);
          onClose();
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error("Delete error:", error);
      }
    });
  };

  const isOpen = type === "deleteProperty" && open;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
          <DialogDescription className="text-destructive">
            Are you absolutely sure? This action cannot be undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3 flex justify-end gap-3">
          <Button variant="outline" disabled={isPending} onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            isLoading={isPending}
            variant="destructive"
            onClick={handleDelete}
            loadingLabel="Deleting"
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
