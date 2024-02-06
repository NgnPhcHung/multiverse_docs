export const generateHexColor = (existedColors: string[]) => {
  let colorCode = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  while (existedColors.includes(colorCode)) {
    colorCode = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  return colorCode;
};
