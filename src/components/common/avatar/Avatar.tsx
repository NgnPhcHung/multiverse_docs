import { AvatarGenerator } from "random-avatar-generator";

interface AvatarProps {
  name: string;
  color: string;
}

export const Avatar = ({ color, name }: AvatarProps) => {
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();

  return (
    <div
      style={{
        backgroundColor: color,
      }}
    >
      <img alt="avatar" src={avatar} className="w-7 h-7 rounded-full" />
    </div>
  );
};
