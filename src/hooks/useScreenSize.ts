import useMediaQuery from "./useMediaQuery";

export const useScreenSize = () => {
  const md = useMediaQuery("(max-width:768px)");
  const lg = useMediaQuery("(max-width:1024px)");
  const xl = useMediaQuery("(max-width:1240px)");
  const xxl = useMediaQuery("(max-width:1500px)");
  const xxxl = useMediaQuery("(max-width:1960px)");

  return { md, lg, xl, xxl, xxxl };
};
