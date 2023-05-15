import { Box, Center, PasswordInput, Group, TextInput, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { LoginForm } from "../../types/forms";

import { useNavigate } from "react-router-dom";


type LoginProps = {
  form: UseFormReturnType<LoginForm, (values: LoginForm) => LoginForm>;
};

export const Login = ({ form }: LoginProps) => {
  const navigate = useNavigate();

  return (
    <Center>
      <Box miw={400} mt={50}>
      <h1>Logowanie do panelu admina</h1>
        <form>
          <TextInput
            label='Użytkownik'
            placeholder="Nazwa użytkownika"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label='Hasło'
            placeholder="Hasło"

            {...form.getInputProps("password")}
          />
        </form>
        <Group position='center' mt='xl'>
          <Button variant='default' onClick={() => navigate("/")}>
            Powrót
          </Button>
          <Button
            onClick={() => navigate("/admin")}  // TODO handling login
          >
            Zaloguj się
          </Button>
        </Group>
      </Box>

    </Center>
  );
};
