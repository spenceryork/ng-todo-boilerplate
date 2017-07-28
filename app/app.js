"use strict";

let todoApp = angular.module("TodoApp", ["ngRoute"])
.constant("FirebaseUrl", "https://d20-ng-todo.firebaseio.com/");

todoApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/todos/view', {
    templateUrl: 'partials/todo-list.html',
    controller: 'TodoListController'
  })
  .when('/todos/new', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoAddController'
  })
  .when('/todos/detail/:todoId', {
    templateUrl: 'partials/todo-detail.html',
    controller: 'TodoDetailController'
  })
  .when('/todos/edit/:todoId', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoEditController'
  })
  .otherwise('/');
});
