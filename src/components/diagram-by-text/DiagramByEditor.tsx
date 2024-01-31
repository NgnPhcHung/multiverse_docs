import { Cursors, Sidebar } from "components";

export const DiagramByEditor = () => {
  return (
    <div className="flex dark:bg-brand relative h-full overflow-hidden">
      <Sidebar>
        {/* <Editor /> */}
      </Sidebar>
      <main className="flex-1 h-full overflow-y-auto relative">
        <Cursors />
      </main>
    </div>
  );
};
