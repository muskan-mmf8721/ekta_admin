"use client";

import { User } from "@/lib/users-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  user: User | null;
  onClose: () => void;
}

export function DeleteUserModal({ user, onClose }: Props) {
  function handleDelete() {
    // API integration will go here
    onClose();
  }

  return (
    <Dialog open={!!user} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-sm p-0 gap-0 overflow-hidden"
      >
        <div className="p-6 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-base font-bold text-foreground">
              Delete this user?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This will remove{" "}
              <span className="font-semibold text-foreground">
                {user?.name}
              </span>{" "}
              and any machine allotments. This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-9"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="flex-1 h-9 bg-red-500 hover:bg-red-600 text-white border-transparent"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
