'use strict';

todoApp.controller("TodoListController", function($scope, $window, TodoFactory, FilterFactory, UserFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
    fetchTodos();
  });

  $scope.searchText = FilterFactory;

  // for viewing all todo items, deleting an item, updating completed status
  function fetchTodos() {
    let todoArr = [];
    console.log("Fetch called");
    TodoFactory.getTodoList(currentUser)
    .then( (todoList) => {
      console.log("todo Data", todoList);
      let todoData = todoList.data;
      Object.keys(todoData).forEach( (key) => {
        todoData[key].id = key;
        todoArr.push(todoData[key]);
      });
      $scope.todos = todoArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  }

  $scope.deleteTask = (taskId) => {
    console.log("delete called", taskId);
    TodoFactory.deleteTodoItem(taskId)
    .then( (data) => {
      console.log("removed item", data);
      fetchTodos(currentUser);
    });
  };

  $scope.updateTaskStatus = (todoItem) => {
    console.log("status update");
    TodoFactory.updateTodoStatus(todoItem)
    .then( (data) => {
      console.log("Updated completed status");
    });
  };

});
