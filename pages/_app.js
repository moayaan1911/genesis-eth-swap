import { createTheme, NextUIProvider } from "@nextui-org/react";
import DefiSwap from "./DefiSwap";
import "../styles/globals.css";
import Footer from "./components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
      <DefiSwap />
      <Footer />
    </NextUIProvider>
  );
}

export default MyApp;
