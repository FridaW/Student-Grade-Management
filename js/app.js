var app = angular.module('myapp',['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl:'login.html',
    controller:'loginCtrl'
    
  }).when('/register',{
      templateUrl:'register.html',
      controller:'registerCtrl',
      resolve: [ 'sessionCheck', function(sessionCheck) { 
                   return sessionCheck.resolve();}]
  
  }).when('/home',{
      templateUrl:'home.html',
     // controller:'myAdd'       
    
  }).when('/addStu',{
      templateUrl:'addStu.html',
      controller:'addCtrl',
      resolve: [ 'sessionCheck', function(sessionCheck) { 
                   return sessionCheck.resolve();}]
  }).when('/manageStu',{
      templateUrl:'manageStu.html',
      controller:'managestuCtrl',
      resolve: [ 'sessionCheck', function(sessionCheck) { 
                   return sessionCheck.resolve();}]
  }).when('/logout',{
      templateUrl:'logout.html',
      controller:'logoutController'
 
  }).otherwise({
    redirectTo: '/'
  });
});

app.controller('logoutController', function ($scope, $http, $location) {
    $http.get('http://localhost/test2/controller/logout.php');
    $location.path('/');
});

app.factory("sessionCheck", ['$http','$q', '$location',function($http,$q, $location) {

  return {

    resolve: function () {
      var def = $q.defer();
      $http.get('http://localhost/test2/controller/checksession', {cache: false})
        .then(function(success) {
            if(success.data.status=='loggedin'){
              def.resolve();
            }else{
                $location.path('/');
            }
          },
          function(err) {
              $location.path('/');
          });
      return def.promise;
    }
  };
}]);

app.controller('loginCtrl',function($scope,$http, $location){
    $scope.login_check = function(){
        var username = $scope.username;
        var password = $scope.password;

        var server_req = {
                    'method':'POST', 
                    'url':'http://localhost/test2/controller/loginsession.php', 
                    'data':"username="+username+"&password="+password,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;'}
                };
        $http(server_req).then(function(suc){
            console.log(suc);
            if(suc.data == null){
                $scope.errmes = "invalid username or password"
            }else{
                $location.path('/home');
            }
        },function(err){
              
        });

        return false;
    };
});



app.controller('logoutCtrl',function($http,$location){
    $http.get('http://localhost/test2/controller/logout.php').then(
        function(suc){
            if(suc.data.statusmes=='ok'){
                $location.path('/');
            }else{
               console.log('The server returned value is not ok.'); 
            }
        },function(err){
            console.log(err);
        });

});

app.controller('managestuCtrl', function($scope,$http, $location) {
    //alert("ok");
    /*
   $http.get("http://localhost/test2/controller/checksession.php")
        .then(function(response) {
           
            if (response.data === "right") {

            }else {
                $location.path('/login');
            }
        });

*/
  
     $scope.classes = ["Java", "JS", "PHP"];


    $scope.classChange = function() {        
        var subject_name = $scope.select_classes;
        console.log(subject_name);
        var server_req = {
            'method': 'POST',
            'url': 'http://localhost/test2/controller/getName.php',
            'data': "subject_name=" + subject_name,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' }
        };
        $http(server_req).then(function(suc) {
            console.log(suc.data);
            $scope.names = suc.data;
        }, function(err) {

        });

    }
    $scope.nameChange = function() {
        var subject_name = $scope.select_classes;
        var studentname = $scope.select_names;
        console.log(subject_name + " " + studentname);
        var server_req = {
            'method': 'POST',
            'url': 'http://localhost/test2/controller/monitorClass.php',
            'data': "subject_name=" + subject_name + "&studentname=" + studentname,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' }
        };
        $http(server_req).then(function(suc) {            
            $scope.score1 = suc.data[0].score1;
            $scope.score2 = suc.data[0].score2;
            $scope.score3 = suc.data[0].score3;
            $scope.average = (parseInt(suc.data[0].score1) + parseInt(suc.data[0].score2) + parseInt(suc.data[0].score3))/3;
           // $scope.average = sum/3;
            
        }, function(err) {

        });

    }


});


app.controller('logoutCtrl',function($scope,$http,$location){
    $scope.logout = function(){
        $http.get("http://localhost/test2/controller/logout.php")
    .then(function(response){
       
        $location.path('/login'); 
    });  
    }
     
});
    
app.controller('addCtrl',function($scope,$http,$location){
  /*
    $http.get("http://localhost/test2/controller/checksession.php")
        .then(function(response) {
            console.log(response.data);
            if (response.data === "right") {

            }else {
                $location.path('/login');
            }
        });
    
 */
    $scope.classes = ["Java", "JS", "PHP"];      
    $scope.submit_student = function(){
       // var classname = $scope.selectedName;
        //var name = $scope.name;
        var subject_name = $scope.select_classes
        var studentname = $scope.studentname;
        var score1 = $scope.score1;
        var score2 = $scope.score2;
        var score3 = $scope.score3;
        
        var server_req = {
                    'method':'POST', 
                    'url':'http://localhost/test2/controller/addstusession.php', 
                    'data':"subject_name=" + subject_name +"&studentname=" + studentname+ "&score1=" + score1 + "&score2=" + score2 + "&score3=" + score3,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;'}
                };
        $http(server_req).then(function(suc){
            if(suc.data.status == 'success'){
                $location.path('/home');
            }else{
               
                $scope.errmes = 'Failed to add new student';
            }
        },function(err){
//            console.log(err);
           
            $scope.errmes = 'Post request error';
        });
        // console.log($scope.student_name);
    }
});

app.controller('registerCtrl', function($scope,$http,$location){
   // sessionService.check_session();
    $http.get("http://localhost/test2/controller/checksession.php")
        .then(function(response) {
           // console.log(response.data);
            if (response.data == "wrong") {
              //  console.log("loginin");
                alert("You've already registered!Please log in.");
                $location.path('/login')
            }else {
              
                alert("Welcome!")
            }
        });
    $scope.register = function(){       
        var name = $scope.name;
        var username = $scope.username;       
        var password = $scope.password;
        var location = $scope.location;
        var phone = $scope.phone;
        var email = $scope.email;

        var server_req = {
            'method': 'POST',
            'url': 'http://localhost/test2/controller/register.php',
            'data': "name=" + name + "&username=" + username + "&password=" + password + "&location=" + location+"&phone=" + phone + "&email=" + email,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' }
        };
        $http(server_req).then(function(suc) {}, function(err) {

        });

        $location.path('/login');

        return false;

        //$location.path('/login');

    };

});

   
