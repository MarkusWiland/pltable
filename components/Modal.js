import * as Dialog from "@radix-ui/react-dialog";

export default function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({ title, children }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="modalOverlay" />
      <Dialog.Content className="modalContent">
        <div className="flex items-center justify-between">
          <Dialog.Title className="modalTitle">{title}</Dialog.Title>
          <Dialog.Close className="text-gray-400 hover:text-gray-500">
            close
          </Dialog.Close>
        </div>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
