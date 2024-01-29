import { DiagramByEditor } from "components";
import { provider } from "store";

export default function DiagramByEditorPage() {
  if (provider.shouldConnect) {
    provider.disconnect();
  }

  return (
    <>
      <DiagramByEditor />
    </>
  );
}
