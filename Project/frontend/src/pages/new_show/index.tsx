import {
  Box,
  Center,
  Group,
  Button,
  Autocomplete,
  Select,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

import { useNavigate } from "react-router-dom";

// type LoginProps = {
//     form: UseFormReturnType<LoginForm, (values: LoginForm) => LoginForm>;
//   };

export const NewShow = () => {
  const navigate = useNavigate();

  return (
    <Center>
      <Box miw={400} mt={50}>
        <h1>Nowy seans</h1>
        <form>
          <Autocomplete
            label='Film'
            placeholder='Wybierz film'
            data={["xd", "xd2"]}
            withAsterisk
            //{...form.getInputProps("username")}
          />
          <Select
            label='Sala'
            placeholder='Wybierz salę'
            data={["xd", "xd2"]}
            withAsterisk
            //{...form.getInputProps("password")}
          />
          <DateTimePicker
            label='Dzień i godzina'
            placeholder='Wybierz termin'
            valueFormat='DD.MM.YYYY hh:mm A'
            withAsterisk
            clearable
            dropdownType='modal'
          />
        </form>
        <Group position='center' mt='xl'>
          <Button variant='default' onClick={() => navigate("/admin")}>
            Powrót
          </Button>
          <Button>Dodaj</Button>
        </Group>
      </Box>
    </Center>
  );
};
