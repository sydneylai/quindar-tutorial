#Package Management and using grunt with Quindar Angular

Grunt is a code that compresses code from several files into one file, and edits the html to call that one file, saving the computer substantial processing time. This tutorial will walk through an example using quindar-angular project that uses grunt to handle its third party dependencies.
In order to know more about Grunt <a href="http://gruntjs.com">click here.</a>

###Pre-requisites
You need to install NodeJS on your target host(e.g. Laptop). You can refer to the installation instructions under https://nodejs.org/en/download/.

In case, if you want to clone the entire project then you can install "git" binaries on your target host.

1. Git is pre-installed on MacOS.
2. On Linux host, you can install Git by "sudo yum install git" (for CentOS, Redhat, Fedora) or "sudo apt-get insatll git" (for Ubuntu).
3. You need to create a local copy of this project. For example,

```
git clone https://github.com/audacyDevOps/quindar-tutorials.git
 ```

###How to run the demo
Install all the dependencies by running the following command on your terminal

```
./buildme.sh
```
This will install all the dependencies mentioned in your package.json file.

Alternatively, you can install the required dependencies by type the following

```
npm install
```

Now run the following command in the terminal

```

$ grunt urlconcat

```
This command will concat all the source file into destination file which is finally placed under js/scripts/platform.js. So, now all your third party code is placed under js/scripts/platform.js.

###How does the Url Concat works

Grunt is especially helpful to us because of the contributed task, concat, which combines files both by request and automatically by suffix.

```javascript

module.exports = function(grunt) {

  grunt.initConfig({
          urlconcat: {
              all: {
                  src: [
                      'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js',
                      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.min.js',
                      'https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js',
                      'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js',
                      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
                      'https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js',
                      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js',
                      'https://www.google.com/jsapi',
                      'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js',
                      'http://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min.js',
                      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/localFile/bootstrap.min.css',
                      'https://fonts.googleapis.com/localFile?family=Open+Sans'
                  ],
                  dest: 'js/scripts/platform.js'
              }
          }
      });

```

Take a look above for the part of Grunt file code. The initConfig does exactly what its name suggests: configures the initial grunt states. Within concat, the src section is a list of source files from which to draw code and dest section is the destination of the new concatenated code.

The best part is that we can concat every file with the same suffix with *.suffix (every css with *.css, etc.) as is demonstrated in the above code.

###Excepted Outcome
The outcome of this tutorial is to combine all the third party source code into one file as a destination.
For example, you will see the folder js created along with scripts, and within it platform.js file is also created. This file will combine all the third party files into one file.

