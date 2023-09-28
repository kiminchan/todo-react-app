import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo'
import { Paper, List, Container } from "@material-ui/core";
import './App.css';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  // add 함수 추가
  add = (item) => {
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data });
      // 데이터 추가 후에 데이터 다시 불러오기
      this.loadTodos();
    });
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.data });
      // 데이터 삭제 후에 데이터 다시 불러오기
      this.loadTodos();
    });
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data });
      // 데이터 업데이트 후에 데이터 다시 불러오기
      this.loadTodos();
    });
  }

  componentDidMount() {
    this.loadTodos();
  }

  // componentDidMount() {
  //   call("/todo", "GET", null).then((response) =>
  //     this.setState({ items: response.data })
  //   );
  // }

  // 데이터를 불러오는 함수 정의
  loadTodos = () => {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  render() {

    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );


    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
