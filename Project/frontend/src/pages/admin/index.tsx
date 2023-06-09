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
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

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
      <Stack>
        <Button onClick={handleGoogleLogin}>Login with Google</Button>
        <Button>Logout</Button>
      </Stack>
      <Container my='md'>
        <SimpleGrid
          cols={2}
          spacing='md'
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Paper h={PRIMARY_COL_HEIGHT}>
            <Box ml={25} mr={25}>
              <h2>Seanse</h2>
              <Stack>
                <Button onClick={() => navigate("/new_show")}>
                  Dodaj nowy seans
                </Button>
              </Stack>
            </Box>
          </Paper>
          <Grid gutter='md'>
            <Grid.Col>
              <Paper h={SECONDARY_COL_HEIGHT} radius='md'>
                <Box>
                  <h2>Filmy</h2>
                  <Stack>
                    <Button onClick={() => navigate("/new_movie")}>
                      Dodaj dostępny film
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Paper h={SECONDARY_COL_HEIGHT} radius='md' />
            </Grid.Col>
            <Grid.Col span={6}>
              <Paper h={SECONDARY_COL_HEIGHT} radius='md' />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
};
