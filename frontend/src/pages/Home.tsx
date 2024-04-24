import React from 'react'
import { Container, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Mainimage from '../components/Mainimage'



const Home: React.FC = () => {
return(
    <>
    <div
    className='mx-auto center mt-4'
    >
    <Container>
        <Mainimage/>
    </Container>
    <Container sx={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Link to={"/create"}>
        <Button variant='outlined' sx={{
            margin: "1em",
            width: "10em"
        }}>
            Create Room
        </Button>
        </Link>
        <Link to={"/join"}>
            <Button variant='outlined' sx={{
            margin: "1em",
            width: "10em"
        }}> Join Room </Button>
        </Link>
    </Container>
    </div>
    </>
)

}

export default Home