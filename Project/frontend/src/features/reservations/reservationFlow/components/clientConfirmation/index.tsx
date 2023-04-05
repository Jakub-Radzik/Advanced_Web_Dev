import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type ClientConfirmationProps = {
  onSubmitCallback: () => void;
};

export const ClientConfirmation = ({
  onSubmitCallback,
}: ClientConfirmationProps) => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
      phone: "",
      firstName: "",
      lastName: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: value => (value.length > 0 ? null : "First name is required"),
      lastName: value => (value.length > 0 ? null : "Last name is required"),
      phone: value => (value.length > 0 ? null : "Phone number is required"),
      termsOfService: value =>
        value ? null : "You must agree to terms of service",
    },
  });

  const onSubmit = () => {
    // TODO: Send data to backend
    form.isValid() && onSubmitCallback();
  };

  return (
    <Center>
      {" "}
      <Box miw={400}>
        <form onSubmit={onSubmit}>
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
          <Group position='right' mt='md'>
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};
