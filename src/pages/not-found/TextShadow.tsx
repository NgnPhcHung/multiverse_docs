interface TextShadowProps {
  content: string;
}

export const TextShadow: React.FC<TextShadowProps> = ({ content }) => {
  const elements = Array.from({ length: 3 }, () => content);
  const textColor = ["#6e6e6e", "#494949", "#1d1d1d"];

  return (
    <div className="relative opacity-100 lg:opacity-0 group-hover/404:opacity-100  transition-opacity duration-700 z-modal">
      <p className="text-5xl lg:text-7xl  2xl:text-9xl font-extrabold text-neutral-400 ">
        {content}
      </p>
      {elements.map((element, index) => (
        <p
          key={index}
          className="absolute text-5xl lg:text-7xl 2xl:text-9xl font-extrabold"
          style={{
            top: `${index * 4}px`,
            left: `${index * 4}px`,
            color: textColor[index],
            transformOrigin: "center",
          }}
        >
          {element}
        </p>
      ))}
    </div>
  );
};
