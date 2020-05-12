import React from "react";
import axios from "axios";
import "./App.css";

import { Card, Form, Navbar, NavDropdown, Nav } from "react-bootstrap";

const gitlogo = require("./assets/github.png");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lectures: [],
      pageContent: "",
      pageNumber: 0,
      lectureTitle: "",
      result: [],
      input: "",
      status: false,
    };
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
    console.log(this.state.input);
  }

  componentDidMount() {
    const url = "https://openbook-searcher.herokuapp.com/lecture/get_lec";
    axios.get(url).then((res) => {
      this.setState({
        lectures: res.data,
      });
      console.log(this.state.lectures);
    });
  }

  searchLectures = () => {
    let aar = [];
    this.state.lectures.map((el, index) => {
      el.content.map((ct, index) => {
        let keyword = this.state.input.toLocaleLowerCase().replace(/ /g, "");
        var content_lower = ct.toLowerCase().replace(/ /g, "");
        let myReg = new RegExp(keyword + ".*");
        if (content_lower.match(myReg)) {
          let resultArray = {
            pageContent: ct,
            pageNumber: ++index,
            lectureTitle: el.lectureName,
          };

          aar.push(resultArray);
        }
      });
    });
    this.setState({ result: aar });
    if (aar.length === 0) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  };

  render() {
    console.log(this.state.result);

    const child = this.state.result.map((el, index) => {
      return (
        <Card bg="dark" border="success" style={{ margin: 10 }}>
          <Card.Body>
            <Card.Title style={{ color: "#36bdbe", fontWeight: "bold" }}>
              {el.lectureTitle}
            </Card.Title>
            <Card.Subtitle style={{ color: "yellow" }} className="mb-2 ">
              Slide No :{" "}
              <span style={{ fontWeight: "bolder" }}>{el.pageNumber}</span>
            </Card.Subtitle>
            <Card.Text style={{ color: "white" }}>{el.pageContent}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div>
        {/* <div className="jumbotron jumbotron-fluid py-2">
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
         
            <Form style={{ marginLeft: 40, marginRight: 40 }}>
              <Form.Control as="select" custom>
                <option>CTSE</option>
              </Form.Control>
            </Form>
            <div style={{ float: "left" }}>
              <span style={{ marginRight: 10 }}>Contribute</span>{" "}
              <img src={gitlogo} style={{ width: 30, height: 30 }} />
            </div>
          </div>
        </div> */}
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="light"
          style={{ backgroundColor: "#e9ecef" }}
        >
          <Navbar.Brand href="#home">
            {" "}
            <h3 className="display-8" style={{ color: "black", fontSize: 40 }}>
              Openbook 📝
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                style={{ color: "black" }}
                title="CTSE"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">CTSE</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                eventKey={2}
                href="https://github.com/dulajkavinda/openbook-client-RT"
              >
                <img src={gitlogo} style={{ width: 30, height: 30 }} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ margin: 20 }}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={this.state.input}
              name="todotask"
              placeholder="Type here..."
              autoComplete="off"
              onKeyPress={() => {
                this.searchLectures();
              }}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <div className="input-group-append">
              <button
                onClick={() => {
                  this.searchLectures();
                }}
                className="btn btn-success"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {this.state.status ? (
          <div style={{ margin: 20 }}>
            <Card bg="danger" className="text-center">
              <Card.Body>
                <Card.Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Sorry no results found :(
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div style={{}}>{child}</div>
        )}
      </div>
    );
  }
}

export default App;
