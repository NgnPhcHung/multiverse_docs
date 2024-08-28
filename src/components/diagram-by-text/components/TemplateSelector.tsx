import { Button, Dialog } from "@src/components/common";
import { DBDiagramTemplate } from "@src/consts";
import { useDisclosure } from "@src/hooks";
import { useDiagramStore, useEditorStore } from "@src/store";
import { templateData } from "./templateData";

export const TemplateSelector = () => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const { setEdges, setNodes } = useDiagramStore((state) => ({
    setEdges: state.setEdges,
    setNodes: state.setNode,
  }));
  const { setContent } = useEditorStore((state) => ({
    setContent: state.setEditorContent,
  }));

  const chooseTemplate = (selection: DBDiagramTemplate) => {
    const data = templateData[selection];

    setEdges(data.edges);
    setNodes(data.nodes);
    setContent(data.editorContent);
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>Select template</Button>
      <Dialog
        onClose={closeModal}
        opened={opened}
        title="Select your template to start"
        size="lg"
      >
        <Dialog.Description className="space-y-4 mt-4">
          {Object.values(DBDiagramTemplate).map((option, index) => (
            <div
              key={index}
              className="w-56 p-4 rounded-md hover:shadow-md bg-primary shadow-secondaryHover cursor-pointer"
              role="button"
              onClick={() => chooseTemplate(option as DBDiagramTemplate)}
            >
              {option}
            </div>
          ))}
        </Dialog.Description>
      </Dialog>
    </>
  );
};
