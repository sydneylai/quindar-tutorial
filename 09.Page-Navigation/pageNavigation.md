#Introduction
###Page Navigation in AngularJS

This tutorial covers the mechanics of page navigation using quindar-angular project. We employ ui-routers for our pages as the dynamic need for loading pages.

ui-router is an NPM package that allows developers to define which UI view (e.g. web page) will be displayed.
When certain mouse click actions occur. For example, in quindar-platform project, you can define 4 UI views (web pages) users can navigate: (1) data generator web page, (2) data metrics web page, (3) data browser web page, (4) data clean up web page.

The benefit for using ui-router (over ng-router package) is that you can use multiple UI views on the same web page.

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
cd 09.Page-Navigation
cd tutorial9a
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

##How it works

If you open this folder /app/controllers/, then you’ll find indexControllers.js which contains the following code:

```javascript

   // ui.router definitions
   app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
    .state("home", {
        url: "/",
        views: {
          "sidebar": {
             templateUrl: "app/views/sidebar.html"
           },
           "footer": {
             templateUrl: "app/views/footer.html"
           }
        }
    })
    .state("dashboardnoborder", {
        url: "/dashboardnoborder",
        views: {
           "dashboardnoborder" : {
             templateUrl: "app/views/quindarDashboardView.html"
           }
        },
        controller: 'dashboardController'
    })
    .state("dashboard", {
        url: "/dashboard",
        views: {
          "sidebar": {
             templateUrl: "app/views/sidebar.html"
           },
           "dashboard" : {
             templateUrl: "app/views/quindarDashboardView.html"
           }
        },
        controller: 'dashboardController'
    })
    .state("about", {
        url: "/about",
        views: {
          "sidebar": {
             templateUrl: "app/views/sidebar.html"
           }

        },
        controller: 'aboutController'
    })

    .state("settings", {
        url: "/settings",
        views: {
           "settings" : {
             templateUrl: "app/views/quindarWidgetSettings.html"
           }
        },
        controller: 'dashboardController'
    })

  }]);

```

Each section defines a state that the web page may be in based on mouse clicks, or other interaction from the client. Each state has a defined suffix to add to the default url of the web page listed under “templateURL,” which, as expected, appends the url to navigate to the new view defined in the state.
