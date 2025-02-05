declare module "remote/Button" {
  const Button: React.FC;
  export default Button;
}
declare module "host/store" {
  import { Store } from "@reduxjs/toolkit";
  const store: Store;
  export { store };
}
declare module "host/ThemeProvider" {
  import { ReactNode } from "react";

  interface ThemeProviderProps {
    children: ReactNode;
  }

  const ThemeProvider: React.FC<ThemeProviderProps>;
  export default ThemeProvider;
}
