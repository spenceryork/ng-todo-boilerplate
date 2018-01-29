"use strict";

angular.module("TodoApp").controller("ItemListCtrl", function($scope, ItemFactory, FilterFactory) {

    $scope.searchTerm = FilterFactory;

    $scope.items = ItemFactory.getTodoItems();

});