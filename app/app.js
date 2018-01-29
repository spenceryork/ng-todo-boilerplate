"use strict";

angular.module("TodoApp", ["ngRoute"])
.config( ($routeProvider) => {
    // TODO: add routing
    $routeProvider
    .when('/items/list', {
        templateUrl: "partials/item-list.html",
        controller: "ItemListCtrl"
    })
    .when('/items/new', {
        templateUrl: "partials/item-new.html",
        controller: "ItemNewCtrl"
    })
    .when('/items/deets/:id', {
        templateUrl: "partials/item-details.html",
        controller: "ItemDetailCtrl"
    })
    .otherwise('/items/list');
});

// $scope.items = [
//   {
//     id: 0,
//     task: "mow the lawn",
//     isCompleted: false,
//     dueDate: "12/5/17",
//     assignedTo: "Greg",
//     location: "Joe's house",
//     urgency: "low",
//     dependencies: "sunshine, clippers, hat, water, headphones"
//   },
//   {
//     id: 1,
//     task: "grade quizzes, I mean Mastery Watzits",
//     isCompleted: false,
//     dueDate: "12/5/17",
//     assignedTo: "Joe",
//     location: "NSS",
//     urgency: "high",
//     dependencies: "wifi, tissues, vodka"
//   },
//   {
//     id: 2,
//     task: "take a nap",
//     isCompleted: false,
//     dueDate: "5/21/18",
//     assignedTo: "Joe",
//     location: "Porch of lakefront cabin",
//     urgency: "medium",
//     dependencies: "hammock, silence"
//   }
// ];
