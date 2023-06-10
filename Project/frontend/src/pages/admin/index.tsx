import {
  Container,
  Grid,
  SimpleGrid,
  useMantineTheme,
  Box,
  rem,
  Stack,
  Button,
  Paper,
  Center,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { SessionList } from "../../features/admin/components/sessionList";
import { RoomList } from "../../features/admin/components/roomList";
import { useMovies } from "../../hooks/useMovies";
import { useAuth } from "../../hooks/useAuth";

const PRIMARY_COL_HEIGHT = rem(750);

export const Admin = () => {
  const [renderPanel, setRenderPanel] = useState<boolean>(false);
  const {logout } = useAuth();


  const handleGoogleLogin = async () => {
    try {
      window.location.replace("http://localhost:8008/api/v1/auth/token");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const navigate = useNavigate();

  const { getStatus } = useMovies();
  useEffect(() => {
    getStatus().then(
      status => {
        status === 200 ? setRenderPanel(true) : setRenderPanel(false)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderPanel) {
    return (
      <Container my='md'>
        <SimpleGrid
          cols={2}
          spacing='md'

        >
          <Paper h={PRIMARY_COL_HEIGHT}>
            <Box ml={25} mr={25}>
              <h2>Seanse</h2>
              <Stack>
                <Button onClick={() => navigate("/new_show")}>
                  Dodaj nowy seans
                </Button>
                <SessionList />
              </Stack>
            </Box>
          </Paper>
          <Grid gutter='md'>
            <Grid.Col span={12}>
              <Paper>
                <Box ml={25} mr={25} py={"lg"}>
                  <Title order={2}>Konto</Title>
                  <Stack>
                    <Button color="red" onClick={() =>{
                      setRenderPanel(false)
                      navigate("/")
                      logout()
                    }}>
                      Wyloguj się
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Paper >
                <Box ml={25} mr={25} py={"lg"}>
                  <Title order={2}>Filmy</Title>
                  <Stack>
                    <Button onClick={() => navigate("/new_movie")}>
                      Dodaj dostępny film
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Paper h={SECONDARY_COL_HEIGHT} radius='md'  py={"lg"}>
                <Box ml={25} mr={25}>
                  <Title order={2}>Sale</Title>
                  <RoomList />
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    )
  }
  else {
    return (
      <Center>
          <Stack>
            <Button onClick={handleGoogleLogin}>Login with Google</Button>
          </Stack>
      </Center>
    );
  }
};
