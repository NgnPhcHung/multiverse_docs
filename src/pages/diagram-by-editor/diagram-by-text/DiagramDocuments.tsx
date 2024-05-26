import { Button, Dialog } from "@components";
import { useDisclosure } from "@hooks";

export const DiagramDocuments = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <div>
        <Button onClick={toggle}>Documents</Button>
      </div>

      <Dialog title="Document" opened={opened} onClose={close} size="xl">
        <Dialog.Description>test</Dialog.Description>
      </Dialog>
    </>
  );
};
