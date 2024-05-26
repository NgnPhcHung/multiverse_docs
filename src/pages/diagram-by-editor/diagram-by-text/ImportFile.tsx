import { FileButton } from "@components";
import { MouseEvent } from "react";

export const ImportFile = () => {
  function handleFileSelect(event: MouseEvent<HTMLInputElement>) {
    // Lấy danh sách các files vừa chọn, nhận được đối tượng `FileList`
    const { files } = event.target as HTMLInputElement;

    console.log(files);
  }
  return <FileButton onClick={handleFileSelect}>Click me</FileButton>;
};
