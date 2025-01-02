import logo from './logo.svg';
import Select from 'react-select';
import React, {Component} from 'react';
import TopTen from './Components/TopTen'
import './Components/TopTen/_TopTen.css'
import './App.css';



class App extends Component {
  state = {
    shows : [],
    targetShow : " ",
    defaultShow : {}
  }
  
  getShows() {
    const headers = { 'x-api-key': process.env.REACT_APP_SPIN_QUERY };
    try {
        fetch(
            "https://yd4fvv7sik.execute-api.us-east-2.amazonaws.com/prod/shows",
            {
                method: 'GET',
                headers,
            }
        )
            .then(response => response.json())
            .then(json => {
            console.log(json);
            console.log(headers);
            var lst = []
            if (json.results) {
              for (let i = 0; i < json.results.length; i++) {
                lst.push({value : json.results[i][0], label : json.results[i][0]})
              }
            }
            
                this.setState(() => {
                    
                    return {
                        shows : lst,
                        defaultShow : lst[0]
                    };
                  
                });
                
            });
    } catch (error) {
        console.log('Error: ' + error);
    }
  }

  
  
  handleShowChange = (selectedOption) => {
    console.log("Show:", selectedOption.value)
    this.setState({targetShow : selectedOption.value})
  }
  componentDidMount() {
    console.log("Starting ...")
    this.getShows()
  }
  render() {
    return (

      <div className="App">
        <h3> Select Your Show! </h3>
        <Select options={this.state.shows} onChange={this.handleShowChange} defaultValue={this.state.defaultShow}/>
        <div className='top-content'>
          <TopTen toptentype="Artists" targetShow={this.state.targetShow}/>
          <TopTen toptentype="Songs" targetShow={this.state.targetShow}/>
          <TopTen toptentype="Genres" targetShow={this.state.targetShow}/>
        </div>
      </div>
    );
  }
  
}

export default App;
