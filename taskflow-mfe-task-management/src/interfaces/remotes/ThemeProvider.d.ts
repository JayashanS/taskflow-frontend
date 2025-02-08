declare module "host/ThemeProvider" {
  import { ReactNode } from "react";

  interface ThemeProviderProps {
    children: ReactNode;
  }

  const ThemeProvider: React.FC<ThemeProviderProps>;
  export default ThemeProvider;
}
