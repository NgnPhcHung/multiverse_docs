import { useSocketContext } from "components/providers";
import { useOthers, useRoom } from "config";
import { useDisclosure } from "hooks";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Avatar, TextInput } from "..";
import { Button } from "../button";
import { Dialog } from "../dialog";
import RandomAnimalNames from "random-animal-name";
import { generateHexColor, groupBy } from "utils";
import { AwarenessList } from "interfaces";

export const Nav = ({ children }: PropsWithChildren) => {
  const [opened, { toggle, close }] = useDisclosure();
  const [value, setValue] = useState("");
  const others = useOthers();

  const room = useRoom();
  const { provider } = useSocketContext();

  useEffect(() => {
    const createUserData = () => {
      const name = RandomAnimalNames();

      const awarenessUsers = [
        ...(provider?.awareness.getStates() || []),
      ] as AwarenessList;

      const existedColors = groupBy(
        awarenessUsers,
        (items) => items[1].user?.color
      );

      const color = generateHexColor(
        Object.keys(existedColors).map((color) => color)
      );

      provider?.awareness.setLocalStateField("user", {
        name,
        color,
      });
    };
    createUserData();
  }, [provider]);

  const connect = () => {
    room.connect();
    toast.success("Joined");
    close();
  };
  const disconnect = () => {
    room.disconnect();
    toast.info("Disconnected");
    close();
  };
  const users = useMemo(() => {
    return [...(provider?.awareness.getStates() || [])] as AwarenessList;
  }, [provider, others]);

  return (
    <>
      <nav className="z-50 bg-secondary p-2 w-full flex items-center space-x-4 group/navbar h-12 transition-all ease-out duration-300">
        {children}
        <div className="w-full flex items-center justify-between">
          <Button onClick={toggle}>open modal</Button>
          <div className="flex items-center space-x-2">
            {users.map(
              (user) =>
                user[0] !== null && (
                  <Avatar
                    key={user[0]}
                    name={user[1].user?.name ?? "Anonymous"}
                    color={user[1].user?.color ?? "#C0C0C0"}
                  />
                )
            )}
          </div>
        </div>
      </nav>
      <Dialog opened={opened} onClose={close} size="md">
        <Dialog.Description>
          <div className="flex flex-col items-center justify-center w-full">
            <TextInput
              rightIcon="home"
              label="Room"
              inputType="row"
              classNames={{
                label: "col-span-4",
                inputWrapper: "col-span-8",
              }}
              value={value}
              onChange={setValue}
            />

            <div className="flex flex-wrap items-center justify-center mt-4 overflow-hidden gap-2 w-full">
              <Button
                rightIcon="screen-share"
                className={{
                  button: "flex-[0_0_82%] px-2",
                }}
              >
                Host
              </Button>
              <Button
                variant="subtle"
                rightIcon="screen-share-off"
                className={{
                  button: "flex-[0_0_40%]",
                }}
                onClick={disconnect}
              >
                Disconnect
              </Button>

              <Button
                variant="outline"
                rightIcon="arrow-right-left"
                className={{
                  button: "flex-[0_0_40%]",
                }}
                onClick={connect}
              >
                Join
              </Button>
            </div>
          </div>
        </Dialog.Description>
      </Dialog>
    </>
  );
};
