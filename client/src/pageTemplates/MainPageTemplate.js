import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import SearchInput from "../components/SearchInput";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "./MainPageTemplate.scss";

function MainPageTemplate(props) {
  const { className, children } = props;
  const [searchOpen, setSearchOpen] = useState(false);
  const isMdUp = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className={`main-page-template${className ? " " + className : ""}`}>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="/">MovieBrowse</Navbar.Brand>
        <Navbar.Toggle>
          <GiHamburgerMenu size={24} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="mr-auto"></Nav>
          <div className="d-flex align-items-center">
            {isMdUp && (
              <FaSearch
                size={20}
                onClick={() => {
                  if (!searchOpen) {
                    setSearchOpen(true);
                  }
                }}
                title="Open search"
                className={searchOpen ? "" : "clickable-icon"}
              />
            )}
            <Collapse
              in={searchOpen || !isMdUp}
              dimension="width"
              timeout={1000}
            >
              <div className="search-form-wrapper">
                <InputGroup>
                  <SearchInput id="template-search" />
                  <InputGroup.Append>
                    <Button variant="action">Search</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Collapse>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>{children}</Container>
    </div>
  );
}

export default MainPageTemplate;
