#Introduction to using server
###Web page served by Express Web server

###Purpose
Purpose of this tutorial is to run a Web page example by Express Web server.

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
cd 02.Server-js
cd tutorial2a
```
Now, run the script buildme.sh in order to install NodeJS dependencies and libraries:

```
./buildme.sh
```

After successful installation of all dependencies, then type the following in your terminal

```
nodemon server.js

```
You can also use:

```
node server.js
```

On your terminal, you will see the following message appearing on your terminal
"NodeJS Web server listening on port 3000"

Now, open your browser and type "http://localhost:3000" to view our index.html page.

###Excepted Outcome

Web page, in our case, index.html got displayed by Express Web server on localhost and port number 3000.

Note : node and nodemon commands used to start the server, except nodemon monitors index.html for any changes and updates the website accordingly on refresh.
