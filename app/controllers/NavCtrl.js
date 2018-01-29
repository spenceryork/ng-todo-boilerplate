"use strict";

angular.module("TodoApp").controller("NavCtrl", function($scope, $location, FilterFactory) {

    $scope.searchTerm = FilterFactory;

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    // SAME AS FUNCTION ABOVE
    // $scope.isActive = (viewLocation) => viewLocation === $location.path();

    $scope.navItems = [
        // TODO: hide/show login/logout
        {
            name: "Logout",
            url: "#!/logout"
        },
        {
            name: "Login",
            url: "#!/login"
        },
        {
            name: "All Items",
            url: "#!/items/list"
        },
        {
            name: "Add New Item",
            url: "#!/items/new"
        }
    ];
});