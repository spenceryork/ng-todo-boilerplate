'use strict';

todoApp.controller('TodoEditController', function($scope, $routeParams, $window, TodoFactory) {

  $scope.formTitle = "Edit Todo Item";

  TodoFactory.getSingleTodoItem($routeParams.todoId)
  .then( (todoItem) => {
    $scope.todoItem = todoItem;
  });

  // Hey, this looks familiar! Haven't we seen this defined somewhere else?
  // Yes, but the guts are different. But with the same name as a function over
  // in the todoAddController, the form we're re-using can invoke a single function name
  // but the function does something different depending on what controller is bound to it
  $scope.saveTodoItem = () => {
    TodoFactory.updateTodoStatus($scope.todoItem)
    .then( (data) => {
      console.log("Edited todo item saved");
      $window.location.href = "#!/todos/view";
    });
  };


});
