var app=angular.module('myApp', []);
app.controller('MyCtrl', ['$scope','$http', '$filter', function ($scope,$http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.data = [];
    $scope.q = '';
    $scope.listamaquinas = [];
    $scope.listaoperador = [];
    
    $scope.mostraTagCC = false;
    $scope.mostraTagMaquina = false;
    $scope.mostraTagOperador = false;      
    
    
    $scope.setClickedRow = function(item,index){  //function that sets the value of selectedRow to current index
         $scope.listamaquinas = item;
         $scope.mostraTagCC = true;
         $scope.mostraTagMaquina = false;
         $scope.showOperador = false;
    }   
    
    $scope.setClickedRowMaquinas = function(item) {
		$scope.listaoperador = item;
        $scope.mostraTagMaquina = true;
        $scope.showOperador = true;
	}

    
    $http.get("apontamentos.json").success(function(data) {
		$scope.data = data;
	})

    
    $scope.getData = function () {
      return $filter('filter')($scope.data, $scope.q) 
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }
    
    $scope.$watch('q', function(newValue,oldValue){             if(oldValue!=newValue){
	  $scope.currentPage = 0;
  }
},true);
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
