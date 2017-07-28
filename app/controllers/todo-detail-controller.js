'use strict';

todoApp.controller('TodoDetailController', function($scope, $routeParams, $window, TodoFactory) {

  TodoFactory.getSingleTodoItem($routeParams.todoId)
  .then( (todo) => {
    console.log("todo item", todo);
    $scope.selectedItem = todo;
  })
  .catch( (err) => {
    console.log("error! No item returned", err );
  });

  $scope.loadEditForm = (selectedItemId) => {
    $window.location.href = `#!/todos/edit/${selectedItemId}`;
  };

});
