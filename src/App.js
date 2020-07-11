import React from "react";
import axios from "axios";
import "./App.css";

import Highlighter from "react-highlight-words";

import { Card, Form, Navbar, Nav } from "react-bootstrap";

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
      route: "lecture",
      inputEmpty: "",
    };
  }

  handleChange(e) {
    this.setState({ input: e.target.value, inputEmpty: false });
  }

  componentWillMount(data) {
    const url = `https://openbook-searcher.herokuapp.com/${
      data == null ? this.state.route : data
    }/get_lec`;
    axios.get(url).then((res) => {
      this.setState({
        lectures: res.data,
      });
      // console.log(this.state.lectures);
    });
  }

  searchLectures = () => {
    if (this.state.input !== "") {
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
    } else {
      this.setState({ inputEmpty: true });
    }
  };

  onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      this.searchLectures();
    }
  };

  handleChangeSelect = (e) => {
    let data = e.target.value;
    this.componentWillMount(data);
    console.log(e.target.value);
    console.log(this.state.route);
  };

  render() {
    console.log(this.state.result);

    const child = this.state.result.map((el, index) => {
      return (
        <Card key={index} bg="dark" border="success" style={{ margin: 10 }}>
          <Card.Body>
            <Card.Title style={{ color: "#36bdbe", fontWeight: "bold" }}>
              {el.lectureTitle}
            </Card.Title>
            <Card.Subtitle style={{ color: "yellow" }} className="mb-2 ">
              Slide No :{" "}
              <span style={{ fontWeight: "bolder" }}>{el.pageNumber}</span>
            </Card.Subtitle>
            <Card.Text style={{ color: "white" }}>
              <Highlighter
                highlightStyle={{ backgroundColor: "#8fc397" }}
                searchWords={this.state.input.split(" ")}
                textToHighlight={el.pageContent}
              />
              }
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="light"
          style={{
            backgroundColor: "#e9ecef",
          }}
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
              <Form.Control
                onChange={(value) => {
                  this.handleChangeSelect(value);
                }}
                as="select"
                custom
              >
                <option value="lecture">CTSE (10/10 Lectures Processed)</option>
                <option value="mllecture">ML (01/10 Lectures Processed)</option>
                <option value="dslecture">DS (08/08 Lectures Processed)</option>
                <option value="mtitlecture">
                  MTIT (08/08 Lectures Processed)
                </option>
                <option value="cfirlecture">
                  CFIR (05/05 Lectures Processed)
                </option>
                <option value="lecture">QA (00/10 Lectures Processed)</option>
                <option value="mktnlecture">
                  Marketing (10/10 Lectures Processed)
                </option>
                <option value="econlecture">
                  Econ (09/09 Lectures Processed)
                </option>
                <option value="oblecture">OB (09/09 Lectures Processed)</option>
                <option value="fnlecture">
                  Finance (06/06 Lectures Processed)
                </option>
                <option value="lawlecture">
                  Law (07/07 Lectures Processed)
                </option>
              </Form.Control>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#">
                <img src={gitlogo} style={{ width: 30, height: 30 }} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ margin: 20 }}>
          <div className="input-group ">
            <input
              type="text"
              className={
                this.state.inputEmpty
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.input}
              name="todotask"
              placeholder="Type here..."
              autoComplete="off"
              onKeyPress={(e) => this.onKeyPressHandler(e)}
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
