import React from "react";
import "./App.css";

import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lectures: [],
    };
  }

  componentDidMount() {
    const url = "http://localhost:1234/lecture/get_lec";
    axios.get(url).then((res) => {
      this.setState({
        lectures: res.data,
      });
    });
  }

  render() {
    const child = this.state.lectures.map((el, index) => {
      if (el.lectureName.match(/Flutter/gi)) {
        return (
          <div key={index}>
            <p>Lecture Name - {el.lectureName}</p>
            <p>Number of Pages- {el.slideNumber}</p>
            <p>Content- {el.content[4]}</p>
            <hr />
            {/* <p>slideNumber - {el.lectures.slideNumber}</p> */}
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <div>
        <div>{child}</div>
      </div>
    );
  }
}

export default App;
