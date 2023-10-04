import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo'
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
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
      this.setState({ items: response.data, loading: false })
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

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    );


    // loading 중이 아닐 때
    var todoListPage = (
      <div>
        {navigationBar} <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    //loading 중일 때
    var loadingPage = <h1>로딩중..</h1>
    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
