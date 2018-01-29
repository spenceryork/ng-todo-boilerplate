"use strict";

angular.module("TodoApp").controller("ItemDetailCtrl", function($scope, ItemFactory, $routeParams){
    
    // let todoItems = ItemFactory.getTodoItems();

    ItemFactory.getTodoItems()
    .then( (data) => {
        // console.log("");
        let todoItems = data;
        $scope.selectedItem = todoItems.find( (item) => {
           console.log("item", item);
           return item.id === $routeParams.id;
        });
    });
});