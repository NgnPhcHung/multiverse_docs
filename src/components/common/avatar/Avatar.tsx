interface AvatarProps {
  name: string;
  color: string;
}

export const Avatar = ({ color, name }: AvatarProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
    >
      {name}
    </div>
  );
};
