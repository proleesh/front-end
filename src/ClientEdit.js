import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

function ClientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id !== 'new') {
                    const response = await fetch(`/clients/${id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch client with id ${id}`);
                    }
                    const client = await response.json();
                    setItem(client);
                }
            } catch (error) {
                console.error(error);
                // Handle the error, e.g., redirect to an error page or display a message to the user.
            }
        };

        fetchData();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/clients${item.id ? `/${item.id}` : ''}`, {
            method: item.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        navigate('/clients');
    };

    const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={item.name || ''}
                            onChange={handleChange}
                            autoComplete='name'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            value={item.email || ''}
                            onChange={handleChange}
                            autoComplete='email'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">저장</Button>{' '}
                        <Button color="secondary" tag={Link} to="/clients">취소</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default ClientEdit;
