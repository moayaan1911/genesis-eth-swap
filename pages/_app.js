import { createTheme, NextUIProvider } from "@nextui-org/react";
import DefiSwap from "./DefiSwap";
import "./DefiSwap.css";
function MyApp({ Component, pageProps }) {
  const dark = createTheme({
    type: "dark",
  });
  return (
    <NextUIProvider theme={dark}>
      <Component {...pageProps} />
      <DefiSwap />
    </NextUIProvider>
  );
}

export default MyApp;
