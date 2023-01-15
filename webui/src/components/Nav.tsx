import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Syncs from "./Syncs";
import Settings from "./Settings";

interface ItemProps {
  id: string;
  label: string;
  setPage: (id: string) => void;
  activePage: string;
}
function Item({ id, label, setPage, activePage }: ItemProps) {
  const onClick = () => setPage(id);
  const active = id === activePage;

  return (
    <Nav.Item>
      <Nav.Link onClick={onClick} active={active}>
        {label}
      </Nav.Link>
    </Nav.Item>
  );
}

function Navigation() {
  const [page, setPage] = useState("syncs");

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>SimplerSync</Navbar.Brand>
          <Nav className="me-auto">
            <Item
              id="syncs"
              label="Syncs"
              setPage={setPage}
              activePage={page}
            />
            <Item
              id="settings"
              label="Settings"
              setPage={setPage}
              activePage={page}
            />
          </Nav>
          <Nav>
            <Nav.Link>Log out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {page === "syncs" ? (
          <Syncs />
        ) : page === "settings" ? (
          <Settings />
        ) : null}
      </Container>
    </div>
  );
}

export default Navigation;
