import { AvatarGenerator } from "random-avatar-generator";
import { Tooltip } from "..";
import { memo } from "react";

interface AvatarProps {
  name: string;
  color: string;
}

export const Avatar = memo(({ name }: AvatarProps) => {
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();

  return (
    <Tooltip content={name}>
      <div>
        <img alt="avatar" src={avatar} className="w-7 h-7 rounded-full" />
      </div>
    </Tooltip>
  );
});
