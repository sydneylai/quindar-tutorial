#Introduction to REST API
REST(REpresentational State Transfer) is an architectural style, and an approach to communicate that is often used in the development of Web Services.

###Purpose
The purpose of this tutorial is to learn about inline REST API to show how does a simple API works.

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
cd tutorial3a
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

3. Open your browser and type "http://localhost:3000" to view our index.html page.

Next step is to click on here link to view quindar platform is alive. Now you are viewing the in-line REST API invoked by web server in server.js file.

Alternatively, you can view the REST API on your terminal by using curl utility. You need to download and install curl utility and then type the following command on your terminal ```curl -X GET http://localhost:3000/verifyMe``` You will see the same output as seen by clicking the here link.

###Excepted Outcome
Able to see whether quindar platform is alive or not. It will display the in-line REST API invoked by web server in server.js file.