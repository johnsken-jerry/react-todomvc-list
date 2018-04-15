import React, { Component } from 'react';
// import logo from './logo.svg';
import Footer from './footer';
import TodoItem from './todoItem';
import TodoModel from './todoModel';
import './App.css';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const model = new TodoModel();
const ENTER_KEY = 13;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
      editing: null,
    }
  }

  componentDidMount() {
    // console.log(this.props)

  }

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();
    let val = this.state.newTodo.trim();
    if (val) {
      model.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  toggleAll(event) {
    const checked = event.target.checked;
    model.toggleAll(checked);
  };

  toggle(todoToToggle){
    console.log({todoToToggle})
    model.toggle(todoToToggle);
    this.setState({editing: this.state.editing});
  };

  destroy(todo) {
    console.log({todo})
    model.destroy(todo);
    this.setState({editing: this.state.editing});
  };

  edit(todo) {
    this.setState({editing: todo.id});
  };

  save(todoToSave, text) {
    model.save(todoToSave, text);
    this.setState({editing: null});
  };

  cancel() {
    this.setState({editing: null});
  };
  
  render() {
    const {editing,newTodo } = this.state;
    const hash = this.props.location.hash;
    const nowShowing = hash !== '/' && hash.indexOf('#/') >= 0 ? hash.substring(hash.indexOf('#/')+2) : 'all' ;
    let main;
    let todos =  model.todos;
    const shownTodos = todos.filter((todo) => {
      switch (nowShowing) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
      }
    });
    const todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => this.toggle(todo)}
          onDestroy={() => this.destroy(todo)}
          onEdit={() => this.edit(todo)}
          editing={editing === todo.id}
          onSave={()=>this.save(todo)}
          onCancel={this.cancel}
        >
        </TodoItem>
      )
    })

    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    let completedCount = todos.length - activeTodoCount;

    let footer = ''
    if (activeTodoCount || completedCount) {
      footer = (
        <Footer 
          nowShowing={nowShowing}
          count
          completedCount
          onClearCompleted={model.clearCompleted()}
        />
      )
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
					<header className="header">
						<h1>todos</h1>
						<input
							ref="newField"
              className="new-todo"
              name="newTodo"
							placeholder="What needs to be done?"
							value={newTodo}
							onKeyDown={this.handleNewTodoKeyDown}
							onChange={this.handleChange}
							autoFocus={true}
						/>
					</header>
          {main}
					{footer}
				</div>
    );
  }
}

export default App;
