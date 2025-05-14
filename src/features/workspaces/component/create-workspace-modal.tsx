

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { DialogHeader, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const handleClose = () => {
        setOpen(false);
        //TODO: Clear Form
    }
    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};