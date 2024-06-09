import { Dialog, useSocketContext } from "@components";
import { useDisclosure, useUser } from "@hooks";
import { AwarenessList } from "@interfaces";
import { useDiagramStore } from "@store";
import { generateHexColor, groupBy, overrideRoom } from "@utils";
import { Input, InputRef } from "antd";
import { useRoom } from "config";
import { Home } from "lucide-react";
import RandomAnimalNames from "random-animal-name";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/common/button";

export const RoomSettings = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const query = useParams();
  const inputRef = useRef<InputRef>(null);
  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useDiagramStore();
  const room = useRoom();
  const { provider, joinRoom, room: socketRoom } = useSocketContext();
  const { userSettings, setUserSettings } = useUser();

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
      // enterRoom();
      room.connect();
    }
    setUserSettings({ ...userSettings, diagramRoom: roomId });
    toast.success(`Joined ${roomId}`);
    close();
  };
  const disconnect = () => {
    room.disconnect();
    leaveRoom();
    toast.info("Disconnected");
    close();
  };

  return (
    <>
      <Button onClick={toggle}>Room</Button>
      <Dialog title="" opened={opened} onClose={close} size="lg">
        <Dialog.Description>
          <Input
            ref={inputRef}
            className="mt-6"
            prefix={<Home className="w-4 h-4 text-primary" />}
            placeholder="Room name ..."
          />
          <div className="flex items-center justify-end space-x-4 mt-5 w-full">
            <Button
              key="back"
              variant="secondary"
              rightIcon="screen-share-off"
              onClick={disconnect}
            >
              Disconnect
            </Button>
            <Button key="host" rightIcon="screen-share" variant="outline">
              Create room
            </Button>

            <Button key="join" rightIcon="arrow-right-left" onClick={connect}>
              Join
            </Button>
          </div>
        </Dialog.Description>
      </Dialog>
    </>
  );
};
