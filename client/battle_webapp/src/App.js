import React from 'react'
import './styles/App.css';
import AutoComplete from './AutoComplete'
import Search from './Search'
// import SearchResults from './SearchResults';

class App extends React.Component{
  render(){
    return (
      <div className="App">
       <div className="App-Component">
        <AutoComplete/>
        </div>
      </div>
    );
  }
}

export default App;

