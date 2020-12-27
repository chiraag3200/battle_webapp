import React, {Component } from 'react'
import './styles/AutoComplete.css';

class AutoComplete extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],                   // to store the list of locations
            suggestions:[],            // to store suggestions of locations
            text:'',                   // to store the text typed
            data:[],                   // to store the details of the battles
            final_data:[]              // to store the details of the battle having typed location 
        }
    }

    componentDidMount() {
        fetch(`http://localhost${process.env.PORT}/list`)                                       // fetch the list of all the locations to show suggestions
        .then((response) => response.json())
        .then(locations => {
            this.setState({ list: locations });
        });
    }
   
    onTextChanged = (e) => {                                   // to handle text change
        const value=e.target.value;
        let suggestions=[],final_data=[]
        if(value.length === 0){
            this.setState(() => ({suggestions,text:value,final_data}))                       // if  nothing is typed
        } else {
            const regex=new RegExp(`${value}`,'i')
            const suggestions = this.state.list.sort().filter(v => regex.test(v))           // match the typed text with the list of locations
            this.setState(() => ({suggestions,text:value,final_data}))
        }
    }

   renderSuggestions() {                                                                    // to render the suggestions on text change
       const {suggestions} = this.state
       if(suggestions.length===0){                                                          // return null if there is no suggestion
           return null
       }
       return (                                                                            // return list of suggestions
          <ul>
          {suggestions.map((location) => <li onClick={() => this.suggestionSelected(location)}>{location}</li>)}  
         </ul>
       )
   }

   callAPI(){                                                            // fetch details of all the battles 
    fetch(`http://localhost${process.env.PORT}/data`)
        .then((response) => response.json())
        .then(details => {
            this.setState({ data: details });
        });
  }

  componentDidUpdate(){                                                  // call api to fetch the data
    this.callAPI()
  }

suggestionSelected(value) {
    var temp=[]          
    for (const item of this.state.data) {                               // store the details of the selected location
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
   
_renderObject(){                                                                  // render details of the selected location
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

