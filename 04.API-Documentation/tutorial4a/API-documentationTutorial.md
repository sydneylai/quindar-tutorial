#Introduction to APIDOC
It is an inline documentation for RESTful web APIs. It will create a document based on your annotations present in your source code.

###Purpose
The purpose of this tutorial is to create document from API annotations in your source code.

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
cd 04.API-Documentation
cd tutorial4a
```
2. Run the following scripts in order to install NodeJS dependencies and libraries. Also, it will install apidoc globally:

```
./buildme.sh
./buildapidoc.sh
./installapidoc.sh

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

Now, open your browser and type "http://localhost:3000" to view our index.html page. First link check whether system heartbeat. Alternatively, you download and install curl utility and type the following ``` curl -X GET http://localhost:3000/verifyMe ```.

Second link open the api documentation as you specified in your scripts/verifyMe.js file. Alternatively, you can type the following in your browser "http://localhost:3000/api". In both the cases you will be able to view API docs.

###Excepted Outcome
You will be able to view the API documentation as specified in your source code.


