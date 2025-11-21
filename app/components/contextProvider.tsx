"use client";
import { createContext, ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";

export const Context = createContext({
  count: { value: 0, setter: (count: number) => { } },
  theme: { value: "light", setter: (theme: string) => { } },
});

function ContextProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  return (
    <Context.Provider
      value={{
        count: { value: count, setter: setCount },
        theme: { value: theme, setter: setTheme },
      }}
    >
      <ToastContainer position="top-center" theme={theme} />
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
