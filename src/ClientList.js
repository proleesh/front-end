import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useNavigate } from 'react-router-dom';

function ClientList() {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const remove = async (id) => {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...clients].filter(i => i.id !== id);
            setClients(updatedClients);
        });
    };

    useEffect(() => {
        fetch('./clients')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setClients(data);
                setIsLoading(false);
            })
            .catch(error => console.log('Error fetching data: ', error));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const clientList = clients.map(client => (
        <tr key={client.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
            <td>{client.email}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" onClick={() => navigate(`/clients/${client.id}`)}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(client.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));
    console.log('Client List: ', clientList);

    return (
        <div>
            <AppNavbar />
            <Container fluid>

                <h3>사용자</h3>
                <div className='float-end'>
                    <Button color="success" onClick={() => navigate('/clients/new')}>추가</Button>
                </div>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">이름</th>
                            <th width="30%">이메일</th>
                            <th width="40%">동작</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default ClientList;
