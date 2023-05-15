import { Box, Center, Checkbox, Flex, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ClientForm } from "../../../../../types/forms";

type ClientConfirmationProps = {
  form: UseFormReturnType<ClientForm, (values: ClientForm) => ClientForm>;
};

export const ClientConfirmation = ({ form }: ClientConfirmationProps) => {
  return (
    <Center>
      <Box miw={400}>
        <form>
          <Flex justify={"space-between"}>
            <TextInput
              withAsterisk
              label='Imię'
              placeholder='Imię'
              {...form.getInputProps("firstName")}
            />
            <TextInput
              withAsterisk
              label='Nazwisko'
              placeholder='Nazwisko'
              {...form.getInputProps("lastName")}
            />
          </Flex>

          <TextInput
            withAsterisk
            label='Email'
            placeholder='przykladowy@email.com'
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label='Telefon'
            placeholder='+48 123 456 789'
            {...form.getInputProps("phone")}
          />
          <Checkbox
            mt='md'
            label='Wyrażam zgodę na kradzież danych osobowych'
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
        </form>
      </Box>
    </Center>
  );
};
