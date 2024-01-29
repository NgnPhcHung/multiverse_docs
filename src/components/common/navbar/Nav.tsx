import { Avatar } from "components/common/avatar";
import { useDisclosure } from "hooks";
import { awareness, provider } from "store";
import { color } from "utils";
import { useUsers } from "y-presence";
import { Dialog } from "../dialog";
import { PropsWithChildren } from "react";
import { Button } from "../button";

export const Nav = ({ children }: PropsWithChildren) => {
  const users = useUsers(awareness, (state) => state);
  const [opened, { toggle, close }] = useDisclosure();

  const startConnection = () => {
    provider.connect();
    awareness.setLocalState({ color });
  };

  return (
    <>
      <nav className="z-50 bg-secondary p-2 w-full flex items-center space-x-4 group/navbar h-12 transition-all ease-out duration-300">
        {children}
        {Array.from(users.entries()).map(([key, value]) => {
          if (key === awareness.clientID) return null;
          return (
            <Avatar
              name={key.toString()}
              color={value.color}
              key={`${key}+${value.color}`}
            />
          );
        })}
        <Button onClick={toggle}>open modal</Button>
        <Button onClick={startConnection}>connect</Button>
      </nav>
      <Dialog opened={opened} onClose={close} size="lg"></Dialog>
    </>
  );
};
