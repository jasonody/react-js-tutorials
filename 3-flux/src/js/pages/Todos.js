import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      newTodoText: ""
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  createTodo() {
    if (this.state.newTodoText != null && this.state.newTodoText != "") {
      TodoActions.createTodo(this.state.newTodoText)

      this.setState({newTodoText: ""})
    }
  }
  
  handleNewTodoChange(e) {
    const newTodoText = e.target.value
    this.setState({ newTodoText })
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <input placeholder="New todo" onChange={this.handleNewTodoChange.bind(this)} />
        <button onClick={this.createTodo.bind(this)}>Create!</button>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}
