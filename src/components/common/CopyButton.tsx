import { Button } from "antd";
import { Copy, CopyCheck } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";

interface CopyButtonProps {
  dataToCopy?: string;
}

export const CopyButton = ({ dataToCopy = "" }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const copyInterval = setInterval(() => setIsCopied(false), 3000);

    return () => clearInterval(copyInterval);
  }, [isCopied]);

  const onButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsCopied(true);
    window.navigator.clipboard.writeText(dataToCopy);
  };

  return (
    <Button
      className="bg-primary hover:bg-primaryHover text-secondary hover:text-secondaryHover items-center"
      onClick={onButtonClick}
      icon={
        isCopied ? (
          <CopyCheck className="w-4 h-4 mt-1" />
        ) : (
          <Copy className="w-4 h-4 mt-1" />
        )
      }
    />
  );
};
