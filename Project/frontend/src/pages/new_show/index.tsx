import {
  Box,
  Center,
  Group,
  Button,
  Autocomplete,
  Select,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Room } from "../../types/show";
import { Movie } from "../../types/movie";
import { useRooms } from "../../hooks/useRooms";
import { useMovies } from "../../hooks/useMovies";
import { useSessions } from "../../hooks/useSessions";
import { inFutureOrToday } from "../../utils/datetime";

export const NewShow = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);
  const { getRooms } = useRooms();

  const [storedMovies, setStoredMovies] = useState<Movie[]>([]);
  const { getStoredMovies } = useMovies();

  const { postSession } = useSessions();

  const getMovieIdByName = (name: string) => {
    const pickedMovie = storedMovies.find(movie => movie.title === name);

    if (pickedMovie != undefined) {
      return pickedMovie.id;
    }
  };

  useEffect(() => {
    getRooms().then(data => {
      setRooms(data);
      console.log(data);
    });

    getStoredMovies().then(data => {
      setStoredMovies(data);
    });
  }, []);

  const form = useForm({
    initialValues: {
      movie_fk_id: "",
      room_fk_id: "0",
      datefrom: new Date(),
      timefrom: "0",
      dateto: new Date(),
      timeto: "0",
      date_interval: 172800,
      time_interval: 7200,
    },

    transformValues: values => ({
      room_fk_id: Number(values.room_fk_id),
      movie_fk_id: getMovieIdByName(values.movie_fk_id),
      datefrom: values.datefrom.toISOString().substring(0, 10),
      timefrom: values.timefrom,
      dateto: values.dateto.toISOString().substring(0, 10),
      timeto: values.timeto,
      date_interval: values.date_interval,
      time_interval: values.time_interval,
    }),

    validate: {
      datefrom: value =>
        inFutureOrToday(value) ? null : "Data nie może być w przeszłości",
      dateto: value =>
        inFutureOrToday(value) ? null : "Data nie może być w przeszłości",
      timefrom: value => (Number(value) != 0 ? null : "Podaj godzinę"),
      timeto: value => (Number(value) != 0 ? null : "Podaj godzinę"),
      date_interval: value => (value > 0 ? null : "Okres musi być dodatni"),
      time_interval: value => (value > 0 ? null : "Okres musi być dodatni"),
    },
  });

  const handlePost = (values: object) => {
    postSession(values);
    navigate("/admin");
  };

  return (
    <Center>
      <Box miw={400} mt={50}>
        <h1>Nowy seans</h1>
        <form onSubmit={form.onSubmit(values => handlePost(values))}>
          <Autocomplete
            label='Film'
            placeholder='Wybierz film'
            data={storedMovies.map(({ title: value, id }) => ({ id, value }))}
            withAsterisk
            {...form.getInputProps("movie_fk_id")}
          />
          <Select
            label='Sala'
            placeholder='Wybierz salę'
            data={rooms.map(({ id }) => id.toString())}
            withAsterisk
            {...form.getInputProps("room_fk_id")}
          />
          <DatePickerInput
            label='Data rozpoczynająca'
            withAsterisk
            placeholder='Wybierz termin'
            {...form.getInputProps("datefrom")}
          />
          <DatePickerInput
            label='Data kończąca'
            withAsterisk
            placeholder='Wybierz termin'
            {...form.getInputProps("dateto")}
          />
          <TimeInput
            label='Godzina rozpoczynająca'
            withAsterisk
            {...form.getInputProps("timefrom")}
          />
          <TimeInput
            label='Godzina kończąca'
            withAsterisk
            {...form.getInputProps("timeto")}
          />
          <TextInput
            label='Interwał godzinowy'
            withAsterisk
            {...form.getInputProps("time_interval")}
          />
          <TextInput
            label='Interwał dniowy'
            withAsterisk
            {...form.getInputProps("date_interval")}
          />
          <Group position='center' mt='xl'>
            <Button variant='default' onClick={() => navigate("/admin")}>
              Powrót
            </Button>
            <Button type='submit'>Dodaj</Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};
