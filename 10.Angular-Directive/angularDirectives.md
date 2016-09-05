###Directive

We will be using angular-groundtrack to include the groundtrack widget in quindar-angular. In this tutorial, we can include this AngularJS directive in our quindar-angular project.

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
cd 10.Angular-Directive
cd tutorial10a
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

###How to Include Widgets with Quindar

You can add your new directive in Quindar as per the following steps:

1. Create a copy of Quindar-Angular on your target host. e.g. git clone https://github.com/audacyDevOps/quindar-angular
2. Make a copy of your directive on your target host under a different folder.
3. Copy new directive to quindar-angular project.

For example, new directive called quindar-groundtrack with a factory file factory-groundtrack.js:

1. Copy from quindar-groundtrack project folder "/example/app/factories" (https://github.com/audacyDevOps/quindar-groundtrack/tree/master/example/app/factories)
to quindar-angular project folder "/app/factories" on your target host.

2. Edit the quindarWidgetsControllers.js (controller) to add the new directive.

3. Add your widget definition in the $scope.widgetDefinitions.


For instance, the following can be declared in quindarWidgetsControllers.js file.

```javascript

var app = angular.module("app", ['gridster', 'ui.bootstrap', 'ui.router','angular-groundtrack','d3','angular-lineplot']);

```
where angular-groundtrack is the name of our module. Subsequently, use ground track directive in quindarWidgetsControllers.js under dashboardController. Also, declare it under widgetDefinitions variable.

```javascript
// controller: dashboardController for dashboard widgets

app.controller('dashboardController', ['$scope', '$timeout','d3',
  function($scope, $timeout, $d3) {

    $scope.gridsterOptions = {
      margins: [20, 20],
      columns: 4,
      draggable: {
        handle: 'h3'
      }
    };

    $scope.dashboards = {

      '1': {
        id: '4',
        name: 'Ground Operations',
        widgets: [{
          col: 1,
          row: 1,
          sizeY: 1,
          sizeX: 3,
          name: "Page 4 - Quindar Widget 3",
          directive: "quindarpie"
        }, {
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 4 - Ground Track",
          directive: "groundtrack"
        }]
      }]
      }
    };

     var widgetDefinitions = [

      {
        name: 'Ground Track',
        directive: 'wt-random',
        dataAttrName: 'chart',
        style: {
          width: '50%'
        }
      }
    ];

    $scope.widgetDefinitions = widgetDefinitions;

    var defaultWidgets = [
      { name: 'Line Plot' },
      { name: 'Countdown Clock' },
      { name: 'Quindar Pie' },
      { name: 'Ground Track' }
    ];

])

```

Note: Add the controller quindarWidgetsControllers.js to include angular-groundtrack.js. Here is an example of the changes:

var app = angular.module('app')
Add angular-groundtrack as a dependency to the angular.module.

###Excepted Outcome
This will enable Quindar widget to render groundtrack widget on page 4, by specifying the directive name "groundtrack".
