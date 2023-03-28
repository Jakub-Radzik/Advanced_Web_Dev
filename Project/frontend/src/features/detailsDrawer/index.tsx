import { Badge, Box, Button, Divider, Drawer, Rating } from "@mantine/core"
import { Movie } from "../../types/movie"
import { Link } from "react-router-dom";

type DetailsDrawerProps = {
    opened: boolean,
    movie: Movie | null,
    onClose: () => void
}

export const DetailsDrawer = ({opened, movie, onClose}: DetailsDrawerProps) => {
    return (
        movie ?
        <Drawer opened={opened} onClose={onClose} position={'right'}>
            <h2>{movie.title}</h2>
            <Rating value={movie.rate} count={10} />
              <p>{movie.director}</p>
              <p>{movie.duration}</p>
            {movie.genre.map(genre => (
                <Badge color={"dark"} size={"md"} mr='xs'>
                  {genre}
                </Badge>
              ))}
              <Divider my={'xs'}/>
        <Box>
            <h3>Seanse</h3>
            {movie.cinemaScreenings.map(seans => (
                <Box>
                    <p>{seans.date}</p>
                    {
                        seans.times.map(time => (
                            <Link to="/reservate">
                                <Button radius={'xl'} mr={'xs'} mb={'xs'} color={"dark"}>{time}</Button>
                            </Link>
                        ))
                    }
                </Box>
            ))}
        </Box>
        </Drawer> : null
    )
}