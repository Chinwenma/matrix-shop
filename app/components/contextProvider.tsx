"use client";
import { createContext, ReactNode, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
// export const cartReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "ADD_ITEM":
//       return {
//         ...state,
//         [action.payload.id]: action.payload,
//       };
//     case "REMOVE_ITEM":
//       const newState = { ...state };
//       delete newState[action.payload.id];
//       return newState;
//     default:
//       return state;
//   }
// };
export const Context = createContext({
  //   cart: {} as [any, React.Dispatch<any>],
  theme: { value: "light", setter: (theme: string) => {} },
});

function ContextProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  //   const cart = useReducer(cartReducer, {});
  const [theme, setTheme] = useState("light");
  return (
    <Context.Provider
      value={{
        // cart,
        theme: { value: theme, setter: setTheme },
      }}
    >
      <ToastContainer position="top-center" theme={theme} />
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
