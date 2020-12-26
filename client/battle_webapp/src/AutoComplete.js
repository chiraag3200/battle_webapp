import React, {Component } from 'react'
import './styles/AutoComplete.css';

class AutoComplete extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            suggestions:[],
            text:'',
            data:[],
            final_data:[]
        }
    }

    componentDidMount() {
        fetch('/list')
        .then((response) => response.json())
        .then(locations => {
            this.setState({ list: locations });
        });
    }

    onTextChanged = (e) => {
        const value=e.target.value;
        let suggestions=[],final_data=[]
        if(value.length === 0){
            this.setState(() => ({suggestions,text:value,final_data}))
        } else {
            const regex=new RegExp(`${value}`,'i')
            const suggestions = this.state.list.sort().filter(v => regex.test(v))
            this.setState(() => ({suggestions,text:value,final_data}))
        }
    }

   renderSuggestions() {
       const {suggestions} = this.state
       if(suggestions.length===0){
           return null
       }
       return (
          <ul>
          {suggestions.map((location) => <li onClick={() => this.suggestionSelected(location)}>{location}</li>)}
         </ul>
       )
   }

   callAPI(){
    fetch('/data')
        .then((response) => response.json())
        .then(details => {
            this.setState({ data: details });
        });
  }

  componentDidUpdate(){
    this.callAPI()
  }

suggestionSelected(value) {
    var temp=[]
    for (const item of this.state.data) {
        if (item.location === value) {
          temp.push(item)
        }
      }
    this.setState(() => ({
        text:value,
        suggestions:[],
        final_data:temp
    }))
}

_renderObject(){
    return Object.entries(this.state.final_data).map(([key, value], i) => {
        return (
            <div key={value.id}>
             <ul>
                <li>name: {value.name}</li>
                <li>attacker_king: {value.attacker_king}</li>
                <li>defender_king: {value.defender_king}</li>
                <li>attacker_outcome: {value.attacker_outcome}</li>
                <li>battle_type: {value.battle_type}</li>
                <li>attacker_size: {value.attacker_size}</li>
                <li>defender_size: {value.defender_size}</li>
                <li>attacker_commander: {value.attacker_commander}</li>
                <li>defender_commander: {value.defender_commander}</li>
                <li>region: {value.region}</li>
             </ul>
            </div>
        )
    })
}

    render() {
        const {text} =this.state
        const {details} = this.state.data

        return(
            <div className="AutoComplete">
              <input value={text} onChange={this.onTextChanged} type="text" placeholder="enter location"/>
              <ul>
               {this.renderSuggestions()}
              </ul>
              {this._renderObject()}
            </div>
        )
    }
}


export default AutoComplete

