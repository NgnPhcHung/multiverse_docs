import { Input, InputRef, Modal } from "antd";
import { useSocketContext } from "components/providers";
import { useRoom } from "config";
import { useDisclosure } from "hooks";
import { AwarenessList } from "interfaces";
import { Home } from "lucide-react";
import RandomAnimalNames from "random-animal-name";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDiagramStore } from "store";
import { generateHexColor, groupBy, overrideRoom } from "utils";
import { Avatar, ToggleTheme } from "..";
import { Button } from "../button";

export const Nav = ({ children }: PropsWithChildren) => {
  const [opened, { toggle, close }] = useDisclosure();
  const query = useParams();
  const inputRef = useRef<InputRef>(null);
  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useDiagramStore();
  const room = useRoom();
  const { provider, joinRoom, room: socketRoom } = useSocketContext();

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
    return () => createUserData();
  }, [provider, socketRoom]);

  const connect = () => {
    const currentRef = inputRef.current;
    if (!currentRef || !currentRef.input?.value) return;

    const roomId = overrideRoom(currentRef.input.value, query.roomId);
    if (roomId && roomId.length) {
      enterRoom(roomId);
      joinRoom(roomId);
    } else {
      enterRoom;
      room.connect();
    }
    toast.success(`Joined ${roomId}`);
    close();
  };
  const disconnect = () => {
    room.disconnect();
    leaveRoom();
    toast.info("Disconnected");
    close();
  };
  const users = useMemo(() => {
    return [...(provider?.awareness.getStates() || [])] as AwarenessList;
  }, [provider]);

  return (
    <>
      <nav className="z-50 bg-secondary p-2 w-full flex items-center space-x-4 group/navbar h-12">
        {children}
        <div className="w-full flex items-center justify-between">
          <Button onClick={toggle}>Room</Button>
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
        <ToggleTheme />
      </nav>
      <Modal
        title
        open={opened}
        closable
        onCancel={close}
        classNames={{
          footer: "flex space-x-4 justify-end",
        }}
        footer={[
          <Button key="host" rightIcon="screen-share">
            Host
          </Button>,
          <Button
            key="back"
            variant="subtle"
            rightIcon="screen-share-off"
            onClick={disconnect}
          >
            Disconnect
          </Button>,
          <Button
            key="join"
            variant="outline"
            rightIcon="arrow-right-left"
            onClick={connect}
          >
            Join
          </Button>,
        ]}
      >
        <Input
          ref={inputRef}
          className="mt-6"
          prefix={<Home className="w-4 h-4 text-primary" />}
          placeholder="Room name ..."
        />
      </Modal>
    </>
  );
};
