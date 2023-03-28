import "./App.css";
import { AppShell } from "@mantine/core";
import { Header, Navbar } from "./layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Repertoire } from "./pages/repertoire";
import { Reservation } from "./pages/reservation";

function App() {
  return (
    <AppShell
      padding='md'
      header={<Header />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Repertoire />} />
          <Route path='/reservate' element={<Reservation/>} />
        </Routes>
      </BrowserRouter>
    </AppShell>
  );
}

export default App;
