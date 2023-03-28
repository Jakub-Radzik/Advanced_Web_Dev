import { Header as MantineHeader, Text, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Link to='/'>
        <UnstyledButton>
          <Text>KINO</Text>
        </UnstyledButton>
      </Link>
    </MantineHeader>
  );
};
