import React, { Component }from 'react';
import './App.css';
import Person from './Person/Person'
import Radium from 'radium'

class  App extends  Component {
  state = {
    persons: [
      { id: "1", name: 'Paulette', age: 28 },
      { id: "2",  name: 'Melvin', age: 29 },
      { id: "3", name: 'Rose', age: 25 }
    ],
    otherState: 'Some othing value',
    showPersons: false,
    userInput: '',
    inputCharacters: []
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  deletePersonHandler = (personIndex) => {
    // makes a copy of persons array
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1)
    this.setState({persons})
  }

 

  changeNameHandler = (event, id) => {
    const personIndex  = this.state.persons.findIndex(person => 
      person.id === id);
    
    const person = {...this.state.persons[personIndex]}
    person.name = event.target.value;
    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({
      persons
    })
  }

  

  render(){
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => 
            <Person key={person.id} 
                    click={() => this.deletePersonHandler(index)} 
                    name={person.name} 
                    age={person.age} 
                    changeName={(event) => this.changeNameHandler(event, person.id)} />)
          }
        </div>
      )
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'pink',
        color: 'black'
      }
    }

  
    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red'); // classes = ['red']
    }
    if(this.state.persons.length <= 1){
      classes.push('bold'); // classes = ['red', 'bold']
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button id="persons" style={style} onClick={this.togglePersonsHandler}>toggle People</button>
        {persons}
      </div>
    );
  }
  
}

export default Radium(App);



