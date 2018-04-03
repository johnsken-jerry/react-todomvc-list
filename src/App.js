import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ""
    }
  }

  handleNewTodoKeyDown = (event) => {
    
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return (
      <div>
					<header className="header">
						<h1>todos</h1>
						<input
							ref="newField"
              className="new-todo"
              name="newTodo"
							placeholder="What needs to be done?"
							value={this.state.newTodo}
							onKeyDown={this.handleNewTodoKeyDown}
							onChange={this.handleChange}
							autoFocus={true}
						/>
					</header>
					
				</div>
    );
  }
}

export default App;
