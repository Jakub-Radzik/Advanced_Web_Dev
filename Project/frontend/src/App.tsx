import "./App.css";
import { AppShell } from "@mantine/core";
import { Header } from "./layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Repertoire } from "./pages/repertoire";
import { Reservation } from "./pages/reservation";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { NewShow } from "./pages/new_show";
import { useBackend } from "./hooks/useBackend";
import { useForm } from "@mantine/form";
import { LoginForm } from "./types/forms";

function App() {
  const form = useForm<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: value => (value.length > 0 ? null : "Username is required"),
      password: value => (value.length > 0 ? null : "Password is required"),
    },
  });

  useBackend();
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
          <Route path='/login' element={<Login form={form} />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/new_show' element={<NewShow />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
