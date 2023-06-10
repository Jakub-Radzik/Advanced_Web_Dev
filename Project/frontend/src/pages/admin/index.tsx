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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionList } from "../../features/admin/components/sessionList";
import { RoomList } from "../../features/admin/components/roomList";

const PRIMARY_COL_HEIGHT = rem(750);

export const Admin = () => {
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

  return (
    <>
      <Box maw={250}>
        <Stack>
          <Button onClick={handleGoogleLogin}>Login with Google</Button>
          <Button color="red">Logout</Button>
        </Stack>
      </Box>
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
              <Paper h={200} >
                <Box ml={25} mr={25}>
                  <h2>Filmy</h2>
                  <Stack>
                    <Button onClick={() => navigate("/new_movie")}>
                      Dodaj dostępny film
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Paper h={SECONDARY_COL_HEIGHT} radius='md' >
                <Box ml={25} mr={25}>
                  <h2>Sale</h2>
                  <RoomList />
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
};
