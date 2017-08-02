"use strict";

let todoApp = angular.module("TodoApp", ["ngRoute"])
.constant("FirebaseUrl", "https://d20-ng-todo.firebaseio.com/");

todoApp.controller('gardenCtrl', function($scope, $http, FirebaseUrl) {
  // This controller and the related HTML in index.html
  // are based on this mess: http://jsfiddle.net/YXxsH/5/
  let position;
  let counter = 0;
  let garden = {};

  $scope.allowDrop = (ev) => {
      ev.preventDefault();
  };

  $scope.getPos = (ev) => {
      console.log("ev", ev); //the event, which has the target's (the image itself's) x,y coords as properties
      position = [ev.pageX, ev.pageY];
  };

  $scope.drag = (ev) => {
      ev.dataTransfer.setData("Text", ev.target.id);
  };

  $scope.drop = (ev) => {
      counter ++;
      ev.preventDefault();
      // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
      // Basically is grabbing the id string of the image
      let data = ev.dataTransfer.getData("Text");
      console.log("data?", data);
      let $img = $(`#${data}`);
      console.log("img", $img);
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
      // http://api.jquery.com/offset/
      let adjustedX = position[0] - $img.offset().left + $("#graphCanvas").offset().left;
      let adjustedY = position[1] - $img.offset().top + $("#graphCanvas").offset().top;
      $("#graphCanvas")[0].getContext("2d").drawImage($img[0],
        ev.pageX - adjustedX,
        ev.pageY - adjustedY
      );
      garden[`plant${counter}`] = {xCoord: ev.pageX - adjustedX, yCoord: ev.pageY - adjustedY, imgName: $img.attr("id")};
  };

  $scope.saveGarden = () => {
    $http.post(`${FirebaseUrl}gardens.json`,
      angular.toJson(garden))
    .then( (newGardenData) => {
      console.log("new garden saved", newGardenData.name );
    })
    .catch( (err) => {
      console.log("err", err);
    });
  };

  $scope.getGarden = () => {
    $http.get(`${FirebaseUrl}gardens.json`)
    .then( (garden) => {
      console.log("garden", garden.data);
      printGarden(garden.data);
    });
  };

  function printGarden(garden) {
    // We saved nested data (gasp!), so this is how to mine down into it to get the
    // object of objects we need
    let gardenObjects = garden[Object.keys(garden)[0]];
    let canvas = $("#graphCanvas2")[0];
    for( let plant in gardenObjects ) {
      let imgName = gardenObjects[plant].imgName;
      console.log("img", imgName);
      let $img = $(`#${imgName}`);
      console.log("img???", $img[0]);
      canvas
      .getContext("2d").drawImage($img[0], gardenObjects[plant].xCoord, gardenObjects[plant].yCoord);
    }
  }

}); //end crazy canvas experiment


let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if (userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

todoApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/todos/view', {
    templateUrl: 'partials/todo-list.html',
    controller: 'TodoListController',
    resolve: {isAuth}
  })
  .when('/todos/new', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoAddController',
    resolve: {isAuth}
  })
  .when('/todos/detail/:todoId/', {
    templateUrl: 'partials/todo-detail.html',
    controller: 'TodoDetailController',
    resolve: {isAuth}
  })
  .when('/todos/edit/:todoId', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoEditController',
    resolve: {isAuth}
  })
  .otherwise('/');
});
