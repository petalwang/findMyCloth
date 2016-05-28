angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	$ionicModal.fromTemplateUrl('templates/photo.html', {
    scope: $scope
    //animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.photoThumbNails =[
      {name: 'Front', image: 'url', class: 'active'},
      {name: 'Back', image: 'url'},
      {name: 'Side', image: 'url'},
      {name: 'Others', image: 'url'}
    ];
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.controller('CatCtrl', function($scope, $ionicScrollDelegate, $http, $timeout){
$scope.enabled = false;  

$http.get("http://jsonplaceholder.typicode.com/posts/").then(function(result){
  $scope.playlists = result.data;
});
 
$scope.scrollTop = function() { //ng-click for back to top button
  $ionicScrollDelegate.scrollTop();
};

$scope.scrollBottom = function() { //ng-click for back to top button
  $ionicScrollDelegate.scrollBottom(true);
};

$scope.getScrollPosition = function(){
  var topPosition = $ionicScrollDelegate.getScrollPosition().top;
  //console.log(topPosition);
  if(topPosition>0){
    //angular.element(document.querySelector('.category_grid')).css('transform', 'translateY(' + -topPosition + 'px)');
    //angular.element(document.querySelector('.top_bar')).css('transform', 'translateY(' + topPosition*0.8 + 'px)');
    angular.element(document.querySelector('.cat_grid')).addClass("scrollTop");
    angular.element(document.querySelector('.cat_bar')).addClass("scrollDown");

  }
  else if(topPosition <= -30){
    angular.element(document.querySelector('.cat_grid')).removeClass("scrollTop");
    angular.element(document.querySelector('.cat_bar')).removeClass("scrollDown");
  }
};

$scope.tabs =[
{
  title:'Women',
  url:'templates/womenTab.html'
},

{
  title:'Men',
  url:'templates/menTab.html'
},

{
  title:'Accessories',
  url:'templates/acceTab.html'
},

{
  title:'Kids',
  url:'templates/childTab.html'
}];

$scope.currentTab = "templates/womenTab.html";

$scope.onClickTab = function(tab){
  $scope.currentTab = tab.url;
}
$scope.isActiveTab = function(tabUrl){
  return tabUrl == $scope.currentTab;
}

$http.get("data/category.json")
    .then(function (response) {
      $scope.womenCategories = response.data[0].category;
      $scope.menCategories = response.data[1].category;
      $scope.acceCategories = response.data[2].category;
      $scope.childCategories = response.data[3].category;
    });

})

.controller('LoadCtrl', function($scope, $ionicLoading, $location, $timeout){

/****** Auto jump to /srp page after 2s******/
  $timeout(function(){
    $location.path('/srp');
  }, 4000);
})

.controller('SearchCtrl', function($scope, $ionicScrollDelegate, $http, $timeout,  $ionicModal){
  $scope.getScrollPosition = function(){
  var topPosition = $ionicScrollDelegate.getScrollPosition().top;
  //console.log(topPosition);
  if(topPosition>0){
    angular.element(document.querySelector('.item_grid')).addClass("scrollTop");
    angular.element(document.querySelector('.item_top_bar')).addClass("scrollDown");

  }
  else if(topPosition <= -30){
    angular.element(document.querySelector('.item_grid')).removeClass("scrollTop");
    angular.element(document.querySelector('.item_top_bar')).removeClass("scrollDown");
  }
};
  
/**********Popover method**/
$ionicModal.fromTemplateUrl('templates/refine.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

$http.get("data/srp.json")
    .then(function (response) {
      $scope.matchResults = response.data[0].results;
      $scope.brandList = response.data[1].lists;
       //console.log($scope.brandList);
    });

});







