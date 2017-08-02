"use strict";

let todoApp = angular.module("TodoApp", ["ngRoute"])
.constant("FirebaseUrl", "https://d20-ng-todo.firebaseio.com/");

todoApp.controller('gardenCtrl', function($scope, $http, FirebaseUrl){
  // let canvas = document.getElementById("graphCanvas");
  // let canvas = document.createElement("canvas");
  // Getting jshint warning about leaking var (canvas) here

  let position;
  let counter = 0;
  let garden = {};

  $scope.allowDrop = (ev) => {
      ev.preventDefault();
  };

  $scope.getPos = (ev) => {
      console.log("ev", ev);
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
      let img = document.getElementById(data);
      console.log("img", img);
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
      let dx = position[0] - img.offsetLeft;
      let dy = position[1] - img.offsetTop;
      document.getElementById("graphCanvas").getContext("2d").drawImage(img, ev.pageX - dx, ev.pageY - dy);
      console.log("New position?", ev.pageX, ev.pageY);
      garden[`plant${counter}`] = {xCoord: ev.pageX, yCoord: ev.pageY, imgName: img.id};
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
    let canvas = document.getElementById("graphCanvas2");
    for( let plant in gardenObjects ) {
      let imgName = gardenObjects[plant].imgName;
      console.log("img", imgName);
      let img = document.getElementById(imgName);
      console.log("img???", img);
      canvas
      .getContext("2d").drawImage(img, gardenObjects[plant].xCoord, gardenObjects[plant].yCoord);
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
