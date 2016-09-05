#Introduction to REST API
REST(REpresentational State Transfer) is an architectural style, and an approach to communicate that is often used in the development of Web Services.

###Purpose
The purpose of this tutorial is to read a config file, and write to database, which assumes Mongodb database is in place, and Mongoose ORM dependency is installed and used. The previous tutorial mimic of database read and send back the response to the Web server.

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

Now, open your browser and type "http://localhost:3000" to view our index.html page. In this web page, you will see the same output as in tutorial3a and tutorial3b with a third REST API being invoked in scripts/module02.js which will write new telemetry position data point to MongoDB.

Note, position schema is now defined under models/position and using config folder to specify our db configuration, which is both called in module02. In our case, Position is the database schema. We can read from the HTTP body, which contains all the data contents. Mongoose will check and match pre-defined database schema. Subsequently, make sure to include ```require('./app/scripts/module01.js')(app) require('./app/scripts/module02.js')(app, mongoose) ``` in your server.js.

In order to post data to Mongodb, we can type the following command on the terminal ```curl -X POST -H "Content-type: application/json" -d '{"vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956, "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}' http://localhost:3000/services/v1/position```

###Excepted Outcome

The data can be posted to Mongodb database and you can view the result by typing the following URL in your browser ``` http://localhost:3000/services/v1/position```
Search for the posted data at very end of the page.
