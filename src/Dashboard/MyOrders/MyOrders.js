import { faClock, faMapMarkerAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Col , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Service from '../../Pages/Service/Service';

const MyOrders = () => {
    const [services, setServices] = useState([]);
    const [control , setControl] = useState(false);
    const { user } = useAuth();
    const email = user.email;

    useEffect(() => {
        fetch(` https://glacial-tundra-74344.herokuapp.com/myOrders/${email}`)
            .then(res => res.json())
            .then(data => {
                setServices(data)
            })
    }, [control])

    const handleDelete = id =>{
        fetch(` https://glacial-tundra-74344.herokuapp.com/cancelOrder/${id}` , {
            method: "DELETE" ,
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                alert('are you sure? you want to delete. please clicked ok if you want to delete');
                setControl(!control);
            }
            
        })
        console.log(id);
    }

    return (
        <div className="row m-5">
            {
                services?.map(service => (
                    <Col lg={4} md={6} className="mt-5">
                        <Card className="h-100  ">
                            <Card.Img variant="top" className="h-50" src={service?.img} />
                            <Card.Body>
                                <Card.Title >
                                    <h4 style={{ color: "#071C55" }}>{service?.title}</h4>
                                </Card.Title>
                                <div className="text-info">
                                    <div className="d-flex">
                                        <FontAwesomeIcon className="m-1" icon={faClock} />
                                        <p>Duration:<span style={{ color: "#F97150" }}>{service?.duration}</span></p>
                                    </div>
                                    <div className="d-flex">
                                        <FontAwesomeIcon className="m-1" icon={faMapMarkerAlt} />
                                        <p>{service?.location}</p>
                                    </div>
                                </div>
                                <Button onClick={() => handleDelete(service._id)}  variant="btn btn-outline-danger fw-bold">Cancel</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </div>
    );
};

export default MyOrders;