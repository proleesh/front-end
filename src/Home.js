import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';

const Home = () => {
    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <Button color="link">
                    <NavLink to='/clients' style={{ textDecoration: 'none', color: 'inherit' }}>
                        Clients
                    </NavLink>
                </Button>
            </Container>
        </div>
    );
};

export default Home;
