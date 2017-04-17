import React from "react";

import * as ToDoActions from "../actions/TodoActions"

export default class Todo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      newText: props.text,
      editMode: props.edit
    }
  }

  deleteTodo = function () {
    ToDoActions.deleteTodo(this.props.id);
  }

  editTodo = function () {
    this.setState({ editMode: true })
  }

  cancelEdit = function () {
    this.setState({
      editMode: false,
      newText: this.props.text
    })
  }

  saveEdit = function () {
    ToDoActions.editTodo(this.props.id, this.state.newText)
    this.setState({ editMode: false })
  }

  handleNewTextChange = function (e) {
    const newText = e.target.value
    this.setState({ newText })
  }

  render() {
    const { complete, text } = this.props;

    const icon = complete ? "\u2714" : "\u2716"

    if (this.state.editMode) {
      return (
        <li>
          <input value={this.state.newText} focus="focused" onChange={this.handleNewTextChange.bind(this)} />
          <button onClick={this.cancelEdit.bind(this)}>Cancel</button>
          <button onClick={this.saveEdit.bind(this)}>Save</button>
        </li>
      );
    }

    return (
      <li>
        <span>{text}</span>
        <span>{icon}</span>
        <button onClick={this.editTodo.bind(this)}>Edit</button>
        <button onClick={this.deleteTodo.bind(this)}>Delete</button>
      </li>
    );
  }
}
