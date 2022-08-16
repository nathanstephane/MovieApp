import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import axios from "../../../core/axios";
import classes from "./TopRated.module.css";
import sharedclasses from "./shared.module.css"
import axiosIns from "../../../axios";

const TopRated = () => {
    const [movies, setMovies] = useState([]);
    const fetchMovies = async () => {
        try {
            const response = await axiosIns.get("movies", {
                params: {
                    order: "rating",
                },
            });
            setMovies(response.data.reverse().slice(0, 4));
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);
    return (
        <section id="top" className="py-4">
            <h2 className={sharedclasses.subtitle}> <u>Top Rated NFT Movies</u> </h2>
            <Container className="py-4 my-4">
                <Row>
                    {movies.map((e) => (
                        <Col key={e.name} lg={3} md={4} sm={6} xs={12}>
                            <Link to={"/" + e.id}>
                                <Card className={sharedclasses.Movie}>
                                    <img className={classes.Image} src={e.poster} alt={e.name} />
                                    <h5 className={classes.Title}>{e.name}</h5>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TopRated;
