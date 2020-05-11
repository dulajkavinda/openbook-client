import React from "react";
import axios from "axios";
import "./App.css";

import { Card, CardDeck, CardGroup, Form, Image } from "react-bootstrap";

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
        let keyword = this.state.input.toLocaleLowerCase();
        var content_lower = ct.toLowerCase();
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
  };

  render() {
    console.log(this.state.result);
    const child = this.state.result.map((el, index) => {
      return (
        <Card bg="dark" border="success" style={{ margin: 10 }}>
          <Card.Body>
            <Card.Title style={{ color: "white", fontWeight: "bolder" }}>
              {el.lectureTitle}
            </Card.Title>
            <Card.Subtitle style={{ color: "yellow" }} className="mb-2 ">
              Slide No : {el.pageNumber}
            </Card.Subtitle>
            <Card.Text style={{ color: "white" }}>{el.pageContent}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div>
        <div className="jumbotron jumbotron-fluid py-2">
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="display-4">Openbook 📝</h1>
            <Form style={{ marginLeft: 40, marginRight: 40 }}>
              <Form.Control as="select" custom>
                <option>CTSE</option>
              </Form.Control>
            </Form>
            <div style={{ left: 0 }}>
              {" "}
              <span style={{ marginRight: 10 }}>Contribute</span>{" "}
              <img src={gitlogo} style={{ width: 30, height: 30 }} />
            </div>
          </div>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={this.state.input}
            name="todotask"
            placeholder="Please enter..!"
            autoComplete="off"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <div className="input-group-append">
            <button
              onClick={() => {
                this.searchLectures();
              }}
              className="btn btn-outline-success"
            >
              Search
            </button>
          </div>
        </div>

        <div style={{}}>{child}</div>
      </div>
    );
  }
}

export default App;
