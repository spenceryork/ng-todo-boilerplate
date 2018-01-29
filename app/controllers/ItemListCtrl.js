"use strict";

angular.module("TodoApp").controller("ItemListCtrl", function($scope, ItemFactory, FilterFactory) {

    $scope.searchTerm = FilterFactory;

    $scope.deleteTodoItems = (id) => {
        ItemFactory.deleteTodoItems(id);
    };

    ItemFactory.getTodoItems()
    .then( (itemsData) => {
        console.log("itemsData", itemsData);

        $scope.items = itemsData;
    });
    // $scope.items = ItemFactory.getTodoItems();

});