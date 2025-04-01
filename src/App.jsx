// src/App.jsx
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles";
import { theme } from "./styles/theme";
import { QueryProvider } from "./context/QueryContext";
import Layout from "./components/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryProvider>
        <Layout />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;