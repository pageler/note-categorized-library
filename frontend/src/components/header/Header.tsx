import { Container, Dropdown, Navbar } from "react-bootstrap";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
    return (
        <Navbar style={{ backgroundColor: "#d9b18c" }}>
            <Container>
                <Navbar.Brand
                    className="brand"
                    href="/"
                    style={{
                        marginTop: "10px",
                        textAlign: "center",
                        textDecoration: "underline",
                        color: "navy",
                        fontFamily: "Lobster",
                        fontSize: "2.5em",
                    }}
                >
                    Your Note Taking App
                </Navbar.Brand>

                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-primary"
                        id="dropdown-basic"
                        className="justify-content-end"
                    >
                        User name
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            User Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Log out of Library
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
};
