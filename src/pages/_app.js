import { useEffect, useState } from "react";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { ChatContextProvider } from "@/context/ChatContext";

export default function App({ Component, pageProps }) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <AuthContextProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  ) : null;
}
