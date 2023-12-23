import { Container, Dropdown, Navbar } from "react-bootstrap";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <Navbar style={{ backgroundColor: "#d9b18c" }}>
            <Container>
                <Navbar.Brand className="brand">
                    <Link to="/">Your Note Taking App</Link>
                </Navbar.Brand>

                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-primary"
                        id="dropdown-basic"
                        className="justify-content-end btn"
                    >
                        User name
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            User Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                localStorage.removeItem("userInfo");
                                localStorage.removeItem("notes");
                                localStorage.removeItem("tags");
                                navigate("/");
                            }}
                        >
                            Logout of Library
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
};
