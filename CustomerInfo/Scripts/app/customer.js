﻿appRoot.controller('CustomerController', function ($scope, $location, $resource, $dialogs) {

    var userResource = $resource('/api/customer/', {}, { update: { method: 'PUT' } });
    $scope.usersList = [];

    userResource.query(function (data) {
        $scope.usersList = [];
        angular.forEach(data, function (userData) {
            $scope.usersList.push(userData);
        });
    });

    $scope.selectedUsers = [];

    $scope.$watchCollection('selectedUsers', function () {
        $scope.selectedUser = angular.copy($scope.selectedUsers[0]);
    });

    $scope.userGrid = {
        data: 'usersList',
        multiSelect: false,
        selectedItems: $scope.selectedUsers,
        enableColumnResize: false,
        columnDefs: [
            { field: 'Title', displayName: 'Title', width: '5%' },
            { field: 'FirstName', displayName: 'First Name', width: '25%' },
            { field: 'LastName', displayName: 'Last Name', width: '25%' },
            { field: 'Email', displayName: 'Email', width: '25%' },
            { field: 'Mobile', displayName: 'Mobile Number', width: '20%' }
        ]
    };

    $scope.addNewUser = function () {
        $scope.usersList.push({ Id: 0});
        $scope.selectedUser = $scope.usersList[($scope.usersList.length - 1)];
        $(".ngViewport").focus();
        $scope.userGrid.selectRow(($scope.usersList.length - 1), true);
    };

    //update customer and grid
    $scope.updateUser = function (user) {
        if (user.FirstName.length <= 0) {
            alert('Customer First name required.')
            return;
        }
        userResource.update(user, function (updatedUser) {
            $scope.selectedUser.Id = updatedUser.Id;
            $scope.selectedUsers[0].Id = updatedUser.Id;
            $scope.selectedUsers[0].FirstName = updatedUser.FirstName;
            $scope.selectedUsers[0].LastName = updatedUser.LastName;
            $scope.selectedUsers[0].Gender = updatedUser.Gender;
            $scope.selectedUsers[0].Title = updatedUser.Title;
            $scope.selectedUsers[0].Mobile = updatedUser.Mobile;
            $scope.selectedUsers[0].Email = updatedUser.Email;
            $scope.selectedUsers[0].Country = updatedUser.Country;
            $scope.selectedUsers[0].State = updatedUser.State;
            $scope.selectedUsers[0].City = updatedUser.City;
            $scope.selectedUsers[0].Zip = updatedUser.Zip;
            $scope.selectedUsers[0].SSN = updatedUser.SSN;
            $dialogs.notify('Customer Updated', 'Customer Info updated.');

        });
    };

    //Country List
    $scope.countryList = [
        {
            name: 'USA', id: 'usa',
            states: [
                { name: 'Alabama', id: 'al', cities: [{ name: 'Alabaster', id: 'al' }, { name: 'Arab', id: 'ar' }, { name: 'Banks', id: 'bk' }] },
                { name: 'Alaska', id: 'as', cities: [{ name: 'Lakes', id: 'lk' }, { name: 'Kenai', id: 'kn' }, { name: 'Gateway', id: 'gw' }] },
                { name: 'New Jersey', id: 'nj', cities: [{ name: 'Atlanta', id: 'at' }, { name: 'Jersey', id: 'js' }, { name: 'Newark', id: 'nw' }] },
                { name: 'New Carolina', id: 'nc', cities: [{ name: 'Charlotte', id: 'clt' }, { name: 'Religh', id: 'reli' }, { name: 'Wilmington', id: 'wilm' }] },
                { name: 'New York', id: 'ny', cities: [{ name: 'Kingston', id: 'kg' }, { name: 'Lockport', id: 'lp' }, { name: 'Olean', id: 'ol' }] },
                { name: 'Texas', id: 'tx', cities: [{ name: 'Dallas', id: 'dl' }, { name: 'Austin', id: 'as' }, { name: 'Houston', id: 'hs' }] }]
        }
    ];

    //Gender List
    $scope.genderTitle = [
            { gender: 'Male', id: 'M', titles: [{ title: 'Mr.', id: 'Mr' }, { title: 'Dr.', id: 'Sir' }, { title: 'Jr.', id: 'Jr' }] },
            { gender: 'Female', id: 'F', titles: [{ title: 'Ms.', id: 'Ms' }, { title: 'Mrs.', id: 'Mrs' }, { title: 'Dr.', id: 'Dr' }] }]


    $scope.$watch('selectedUser.Gender', function (selectedGenderId) {
        if (selectedGenderId) {
            angular.forEach($scope.genderTitle, function (gender) {
                if (selectedGenderId == gender.id) {
                    $scope.selectedTitles = gender.titles;
                }
            });
        }
    });

    $scope.clearCityAndZip = function () {
        $scope.selectedUsers[0].City = null;
        $scope.selectedUsers[0].Zip = "";
    };

    $scope.$watch('selectedUser.State', function (selectedStateId) {
        if (selectedStateId) {
            angular.forEach($scope.countryList[0].states, function (state) {
                if (selectedStateId == state.id) {
                    $scope.selectedState = state;
                }
            });
        }
    });

    //Ref# http://codepen.io/m-e-conroy/pen/ALsdF
    $scope.launch = function (which) {
        var dlg = null;
        dlg = $dialogs.notify('Please Confirm', 'Do you want to save Customer Info?');
        dlg.result.then(function (btn) {
            $scope.confirmed = 'Customer Info Saved!';
        }, function (btn) {
            $scope.confirmed = 'Customer Info Not Saved';
        });
    }; // end launch


    var init = function () {

    }

    init();
});