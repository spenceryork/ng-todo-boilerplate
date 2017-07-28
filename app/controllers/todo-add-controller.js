'use strict';

todoApp.controller("TodoAddController", function($scope, $window, TodoFactory, UserFactory) {

  $scope.formTitle = "Add New Task";
  $scope.todoItem = {
    assignedTo: "",
    dependencies: "",
    dueDate: "",
    isCompleted: false,
    location: "",
    task: "",
    urgency: "",
    uid: UserFactory.getUser()
  };

  $scope.saveTodoItem = () => {
    TodoFactory.postNewItem($scope.todoItem)
    .then( (data) => {
      console.log("new todo data", data);
      $window.location.href = '#!/todos/view';
    });
  };

});
