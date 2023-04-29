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
              label='First name'
              placeholder='First name'
              {...form.getInputProps("firstName")}
            />
            <TextInput
              withAsterisk
              label='Last name'
              placeholder='Last name'
              {...form.getInputProps("lastName")}
            />
          </Flex>

          <TextInput
            withAsterisk
            label='Email'
            placeholder='your@email.com'
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label='Phone'
            placeholder='+1 123 456 7890'
            {...form.getInputProps("phone")}
          />
          <Checkbox
            mt='md'
            label='I agree to sell my privacy'
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
        </form>
      </Box>
    </Center>
  );
};
