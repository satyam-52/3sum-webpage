import React from "react";
import ReactDOM from "react-dom";

let output = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", res: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ res: [] });
  }

  handleSubmit(event) {
    // alert("A list was submitted: " + this.state.value);
    event.preventDefault();
  }

  getResults() {
    this.setState({ value: this.state.value.trim() });
    let regex = /\s+/;
    let lst = this.state.value
      .split(regex)
      .filter((val) => val !== " ")
      .map((val) => Number(val));
    lst.sort((a, b) => a - b);
    for (let i = 0; i < lst.length - 2; i++) {
      if (i > 0 && lst[i] === lst[i - 1]) {
        continue;
      }
      let l = i + 1;
      let r = lst.length - 1;
      while (l < r) {
        let s = lst[i] + lst[l] + lst[r];
        if (s < 0) {
          l += 1;
        } else if (s > 0) {
          r -= 1;
        } else {
          this.state.res.push([lst[i], lst[l], lst[r]]);
          while (l < r && lst[l] === lst[l + 1]) {
            l += 1;
          }
          while (l < r && lst[r] === lst[r - 1]) {
            r -= 1;
          }
          l += 1;
          r -= 1;
        }
      }
    }
    this.state.res.map((val) => {
      return val.join(",");
    });
    console.log(this.state.res);
    output = this.state.res;
    document.getElementById("res").style.display = "block";
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div id="inp">
            <label htmlFor="list">Enter an Array:</label>
            <p>
              Input example: <strong>-1 0 1 2 -1 -4</strong>
            </p>
          </div>
          <div id="inp2">
            <input
              name="list"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="-1 0 1 2 -1 -4"
            />
            <input
              type="button"
              value="Submit"
              onClick={(this.handleSubmit, this.getResults)}
            />
          </div>
        </form>
        <div id="res">
          <h3>Results:</h3>
          <p>[({output.join("), (")})]</p>
        </div>
      </>
    );
  }
}

ReactDOM.hydrate(<App />, document.getElementById("result"));
