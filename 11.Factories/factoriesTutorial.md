#Introduction

###API Factories
Its a good practice to wrap the API in factories which can then be called from controllers and subsequently, it can be called from index.html.
Factories are functions that can create objects and return them. Their advantage is their access to variable outside of the scope of themselves (they don’t need parameters passed in). This is especially helpful in API calls when variables are set outside of the scope of a function and redefined through the code (factory functions operate on variable with the value they are assigned at time of operation in real time).

###Pre-requisites
You need to install NodeJS on your target host(e.g. Laptop). You can refer to the installation instructions under https://nodejs.org/en/download/.

In case, if you want to clone the entire project then you can install "git" binaries on your target host.

1. Git is pre-installed on MacOS.
2. On Linux host, you can install Git by "sudo yum install git" (for CentOS, Redhat, Fedora) or "sudo apt-get insatll git" (for Ubuntu).
3. You need to create a local copy of this project. For example,

```
git clone https://github.com/audacyDevOps/quindar-tutorials.git
 ```

###How to Run the demo
1. After creating a local copy of this project, follow these steps to change the directory

```
cd 11.Factories
cd tutorial11a
```

2. Run the following scripts in order to install NodeJS dependencies and libraries.

```
./buildme.sh

```

3. After successful installation of all dependencies, then type the following in your terminal

```
nodemon server.js

```
You can also use:

```
node server.js
```

###How does it works

For instance, quindar-platform project can be download from github https://github.com/audacyDevOps/quindar-platform. This project can be used to demonstrate how to use factories with REST API:

```javascript
'use strict';
app.factory('adminFactory', ['$http', '$q', function($http, $q) {
  var admFactory = {};

  // 8/4/2016 RayL: test reading server endpoint from config file
  var serviceHost = ""; // default
  $http.get('/config/platformFactorySettings.js').then(function(res)
  {
     serviceHost = res.data.serviceHost;
     console.log("...reading clientSettings.js for factory. serviceHost=" + serviceHost);
  });


  // ------ Category:  random data generation ----------

  // return a valid satellite vehicle identifier
  // remark: this function returns static, pre-defined satellite vehicles for testing purpose.
  //         we will change to a dynamic lookup function when we need to add/change vehicle ids dynamically
  admFactory.getVehicleId = function() {
    var vehicles = ["IBEX", "CST-100 Starliner", "Orion MPCV", "Dream Chaser CRS-2", "ISRO OV",
      "Skylon D1", "XCOR Lynx", "SIRIUS-1", "ISS (ZARYA)"];
    var x = Math.round((Math.random() * vehicles.length) - 1);
    return vehicles[x];
  };

```

Factory is named at the very first line as “adminFacotry,” with parameters. It will contain smaller functions that act as the API.

Notice that this is the core function of the API! The web service calls the API to generate data through the controller, which then calls the factory.

##Controllers
Follow along with /app/contollers/adminConsoleControllers.js. Remember that controllers act as the hub of activity within javascript web apps.
```javascript
$scope.getAttitudeMetricsTrend = function() {
    $scope.attitudeDataSet = [];
    adminFactory.getMetricsTrendTotalN('attitude', 20)
    .success(function(data, status) {
      var tmpValues = [];
      $scope.attitudeDataSetX = data.trend;
      for (var i = 0; i < $scope.attitudeDataSetX.length; i++) {
         tmpValues.push({ x: i, y: $scope.attitudeDataSetX[i].subtotal });
      };
      $scope.dataAttitudeTrend = [ { key: "Attitude Telemetry", values:  tmpValues }];
      //console.log("getAttitudeMetricsTrend() status=" + status + "   $scope.data=" + JSON.stringify($scope.data));
    })
    .error(function(err) {
      console.error('Sorry, Quindar platform cannot serve getAttitudeMetricsTrend() immediately. Please retry later.');
    });
  };
```
A function is defined to the scope called getAttitudeMetricsTrend. This function first establishes an empty array to be filled in, then calls the adminFacotry to generate attitude data.

###Excepted Outcome

To wrap the REST API in factories so that it can be called from controllers and subsequently, it can be then called from index.html. We must use REST API via factories and do not invoke REST API directly in controller without invoking factories or services.

