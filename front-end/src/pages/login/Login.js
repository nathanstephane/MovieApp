import React, { useContext, useState } from "react";
import {Button, Card, Col, Container, Form, Row, Spinner,} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import classes from "./Login.module.css"
//import axios from "../../core/axios";
import axiosIns from "../../axios";

const Login = () => {
    const [user, setUser] = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axiosIns.post("/users/login", {
                email,
                password,
            });

            if(response.data.status && response.data.status != 200 ){
                setLoading(false);
                return
            }

            const user = response.data;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            setLoading(false);
            setTimeout(() => {
                history.push("/");
            }, 500)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8} sm={10}>
                    <Card className="my-4 p-4">
                        <Form>
                            <Form.Group controlId="email" className="my-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="password" className="my-2">
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
                                    <Button onClick={handleSubmit} className={classes.login_btn}>Login</Button>
                                )}
                            </div>
                        </Form>

                        <p className="text-center">
                            Don't have an Account?{" "}
                            <Link to="/register" replace>
                                Register Here.
                            </Link>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;