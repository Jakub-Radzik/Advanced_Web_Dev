import "./App.css";
import { AppShell } from "@mantine/core";
import { Header } from "./layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Repertoire } from "./pages/repertoire";
import { Reservation } from "./pages/reservation";

function App() {
  return (
    <BrowserRouter>
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
        <Routes>
          <Route path='/' element={<Repertoire />} />
          <Route path='/reservate/:showId' element={<Reservation />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
