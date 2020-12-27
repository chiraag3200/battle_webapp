import React, { Component } from 'react';
import axios from 'axios';
import './styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      king: '',
      location: '',
      type: '',
      data:[]
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { king, location, type } = this.state;

    const details = {
      king,
      location,
      type
    };
    this.searchAPI(details,(d) => {this.setState({data: d})
  })
  };

searchAPI(details,cb){

  axios
      .post('http://localhost:${process.env.PORT}/search', details)
      .then((response) => {
        console.log('Searching')
      }).catch(err => {
        console.error(err);
      });

}

  render() {
    return (
      <div>
        <br />
        <div className="Search">
          <form onSubmit={this.handleSubmit}>
            <div style={{ width: '30%' }}>
              <input
                type="text"
                name="king"
                placeholder="King's Name"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <input
                type="text"
                name="location"
                placeholder="Location"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <input
                type="text"
                name="type"
                placeholder="Type"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;