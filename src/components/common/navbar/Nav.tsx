import { useSocketContext } from "@components";
import { AwarenessList } from "@interfaces";
import { generateHexColor, groupBy } from "@utils";
import RandomAnimalNames from "random-animal-name";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { Avatar } from "..";

export const Nav = ({ children }: PropsWithChildren) => {
  const { provider, room: socketRoom } = useSocketContext();

  const users = useMemo(() => {
    return [...(provider?.awareness.getStates() || [])] as AwarenessList;
  }, [provider]);
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

  return (
    <nav className="z-50 bg-secondary p-2 w-full flex items-center space-x-4 group/navbar h-12">
      {children}
      <div className="w-full flex items-center justify-between">
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
  );
};
