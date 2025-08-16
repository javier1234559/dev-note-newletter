import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface DetailModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedDetail: any | null;
  children: React.ReactNode;
}

export default function DetailModal({
  showModal,
  setShowModal,
  selectedDetail,
  children,
}: DetailModalProps) {
  if (!selectedDetail) return null;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTitle className="sr-only">Detail</DialogTitle>
      <DialogDescription className="sr-only">Detail description</DialogDescription>
      <DialogContent className="max-w-6xl h-[90vh] overflow-auto py-8">
        {children}
      </DialogContent>
    </Dialog>
  );
}
