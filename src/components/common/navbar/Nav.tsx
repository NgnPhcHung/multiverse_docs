import { Avatar } from "components/common/avatar";
import { useDisclosure } from "hooks";
import { PropsWithChildren } from "react";
import { awareness, provider } from "store";
import { color } from "utils";
import { useUsers } from "y-presence";
import { Button } from "../button";
import { Dialog } from "../dialog";

export const Nav = ({ children }: PropsWithChildren) => {
  const users = useUsers(awareness, (state) => state);
  const [opened, { toggle, close }] = useDisclosure();

  const startConnection = () => {
    console.log(awareness.states);
    try {
      if (provider.wsconnected) {
        provider.disconnect();
      } else {
        provider.connect();
        awareness.setLocalState({ color });
      }
    } catch (error) {
      console.log("error",error);
    }
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
        <Button onClick={startConnection}>
          {provider.wsconnected ? "Disconnect" : "Connect"}
        </Button>
      </nav>
      <Dialog opened={opened} onClose={close} size="lg"></Dialog>
    </>
  );
};
