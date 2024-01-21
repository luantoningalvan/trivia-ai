import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";

export default function Layout() {
  return (
    <ThemeProvider theme={{}}>
      <Slot />
    </ThemeProvider>
  );
}
