#Introduction to REST API
REST(REpresentational State Transfer) is an architectural style, and an approach to communicate that is often used in the development of Web Services.

###Purpose
The purpose of this tutorial is to learn how you can mimic database read by returning a pre-defined telemetry position data point.

###Pre-requisites
You need to install NodeJS on your target host(e.g. Laptop). You can refer to the installation instructions under https://nodejs.org/en/download/.

In case, if you want to clone the entire project then you can install "git" binaries on your target host.

1. Git is pre-installed on MacOS.
2. On Linux host, you can install Git by "sudo yum install git" (for CentOS, Redhat, Fedora) or "sudo apt-get insatll git" (for Ubuntu).
3. You need to create a local copy of this project. For example,

```
git clone https://github.com/audacyDevOps/quindar-tutorials.git
 ```

### How to Run the Demo

1. After creating a local copy of this project, follow these steps to change the directory

```
cd 03.Basic-API
cd tutorial3c
```
Now, run the script buildme.sh in order to install NodeJS dependencies and libraries:

```
./buildme.sh
```

2. After successful installation of all dependencies, then type the following in your terminal

```
nodemon server.js

```
You can also use:

```
node server.js
```

This will let you run HTML page on localhost 3000. On your terminal, you will see the following message appearing on your terminal
"NodeJS Web server listening on port 3000"

Now, open your browser and type "http://localhost:3000" to view our index.html page. In this web page, you will see the same output as in tutorial3a with a second REST API being invoked from scripts/module01.js which will minic db read by returning a pre-defined telemetry position data point.

Note, the best practice is to create a separate JS files under /app/scripts for REST API. Subsequently, make sure to include ```require('./app/scripts/module01.js')(app)``` in your server.js. Here, you need to pass the variable 'app' to the module because the variable 'app' contains the express web server instance for re-use.

The main benefit of separating it in a different file is to write your API processing logic outside of server.js. This will help us to maintain our code and easier to debug.

###Excepted Outcome
It will help us to mimic the database read by returning a pre-defined telemetry position data point.
