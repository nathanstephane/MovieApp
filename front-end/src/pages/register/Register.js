import React, { useContext, useState } from "react";
import {Button, Card, Col, Container, Form, Row, Spinner,} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
//import axios from "../../core/axios";
import axiosIns from "../../axios";
import classes from "../login/Login.module.css"

const Register = () => {
    const [user, setUser] = useContext(AuthContext);
    const [username, setUsername] = useState("");
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [country, setCountry] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");

    const history = useHistory();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axiosIns.post("/users/register", {
                username,
                email,
                password,
                country,
                area,
                city,
                street,
                number,
            });

            setLoading(false);
            setTimeout(() => {
                history.push("/login");
            }, 500)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} sm={10}>
                    <Card className="my-4 p-4">
                        <h4 className="text-center">Register</h4>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter country"
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="area">
                                <Form.Label>Area</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Area"
                                    onChange={(e) => setArea(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter City"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="street">
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Street"
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="number">
                                <Form.Label>Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Number"
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                           


                            <div className="text-center my-2">
                                {loading ? (
                                    <Spinner animation="border" variant="primary" />
                                ) : (
                                    <Button onClick={handleSubmit} className={classes.login_btn}>Register</Button>
                                )}
                            </div>
                        </Form>

                        <p className="text-center">
                            Already have an Account?{" "}
                            <Link to="/login" replace>
                                Login Here.
                            </Link>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
