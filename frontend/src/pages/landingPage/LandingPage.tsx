import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LandingPageProps = {};

export const LandingPage = (props: LandingPageProps) => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");

    //     if (userInfo) {
    //         navigate("/noteList");
    //     }
    // }, [navigate]);

    return (
        <div className="landing">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">
                                Your Markdown Note Taking Categorized Library
                            </h1>
                            <p className="subtitle">
                                Secure storage for all your notes.
                            </p>
                        </div>

                        <div className="buttonContainer">
                            <a href="/login">
                                <Button
                                    size="lg"
                                    className="landingButton"
                                    variant="primary"
                                >
                                    LOGIN
                                </Button>
                            </a>
                            <a href="/register">
                                <Button
                                    size="lg"
                                    className="landingButton"
                                    variant="outline-primary"
                                >
                                    SIGNUP
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};
