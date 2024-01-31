import { useDisclosure } from "hooks";
import { PropsWithChildren } from "react";
import { TextInput } from "..";
import { Button } from "../button";
import { Dialog } from "../dialog";

export const Nav = ({ children }: PropsWithChildren) => {
  const [opened, { toggle, close }] = useDisclosure();
  const connect = () => {};

  return (
    <>
      <nav className="z-50 bg-secondary p-2 w-full flex items-center space-x-4 group/navbar h-12 transition-all ease-out duration-300">
        {children}

        <Button onClick={toggle}>open modal</Button>
      </nav>
      <Dialog opened={opened} onClose={close} size="md">
        <Dialog.Description>
          <TextInput
            rightIcon="home"
            label="Create room"
            inputType="row"
            classNames={{
              label: "col-span-4",
              inputWrapper: "col-span-8",
            }}
          />
          <div className="flex items-end justify-end space-x-4 mt-4">
            <Button variant="subtle" rightIcon="arrow-right-left">
              Join room
            </Button>
            <Button rightIcon="screen-share" onClick={connect}>
              Host
            </Button>
          </div>
        </Dialog.Description>
      </Dialog>
    </>
  );
};
