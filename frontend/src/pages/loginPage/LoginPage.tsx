import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./LoginPage.css";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loading } from "../../components/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { Header } from "../../components/header/Header";

type LoginPageProps = {};

export const LoginPage = (props: LoginPageProps) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const config: AxiosRequestConfig = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            setLoading(true);

            const { data } = await axios.post(
                "/api/users/login",
                { email, password },
                config
            );

            console.log("POST DATA", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error: any) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <Container
                className="my-4"
                style={{
                    border: "4px solid grey",
                    padding: "20px",
                    width: "35%",
                    backgroundColor: "lightgrey",
                }}
            >
                <h1 className="mb-4 loginTitle">
                    <u>User Login</u>
                </h1>

                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

                {loading && <Loading />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email" className="my-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="mb-4 loginBtn"
                    >
                        Submit
                    </Button>

                    <Row className="py-4">
                        <Col>
                            New User?{" "}
                            <Link to="/register">Please Register Here</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};
