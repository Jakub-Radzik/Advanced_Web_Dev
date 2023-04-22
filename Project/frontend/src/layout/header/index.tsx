import {
  Flex,
  Header as MantineHeader,
  Title,
  UnstyledButton,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";

export const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Flex align={"center"} justify={"space-between"}>
        <Link to='/'>
          <UnstyledButton>
            <Title ff={"Brush Script MT"} lts={"xl"}>
              {APP_NAME}
            </Title>
          </UnstyledButton>
        </Link>
        <Flex gap={"xl"}>
          <Link to={"/"}>
            <UnstyledButton>
              <Text>Strona główna</Text>
            </UnstyledButton>
          </Link>
          <Link to={"/admin"}>
            <UnstyledButton>
              <Text>Logowanie</Text>
            </UnstyledButton>
          </Link>
        </Flex>
      </Flex>
    </MantineHeader>
  );
};
