import { Header as MantineHeader, Title, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";

export const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Link to='/'>
        <UnstyledButton>
          <Title ff={"Brush Script MT"} lts={"xl"}>
            {APP_NAME}
          </Title>
        </UnstyledButton>
      </Link>
    </MantineHeader>
  );
};
