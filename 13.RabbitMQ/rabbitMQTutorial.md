###RabbitMQ
This tutorial gives an explanation how RabbitMQ client listen and subscribe to RabbitMQ topics and write telemetry data to MongoDB database. The main focus is to make use of multiple RabbitMQ clients to share load and persist the data to database.

###Pre-requisites
You need to install NodeJS on your target host(e.g. Laptop). You can refer to the installation instructions under https://nodejs.org/en/download/.

In case, if you want to clone the entire project then you can install "git" binaries on your target host.

1. Git is pre-installed on MacOS.
2. On Linux host, you can install Git by "sudo yum install git" (for CentOS, Redhat, Fedora) or "sudo apt-get insatll git" (for Ubuntu).
3. You need to create a local copy of this project. For example,

```
git clone https://github.com/audacyDevOps/quindar-tutorials.git
 ```
4. This quindar-mqclient is an add-on to quindar-platform project. You would also need to create a local copy of this project. For example,

```
git clone https://github.com/audacyDevOps/quindar-platform

```


###How to Run the demo
1. After creating a local copy of this project, follow these steps to change the directory

```
cd 13.RabbitMQ
cd tutorial13a
```

2. Run the following scripts in order to install NodeJS dependencies and libraries.

```
./buildme.sh

```

3. After successful installation of all dependencies, start the RabbitMQ client by typing the following in your terminal

```
node server.js audacy.telemetry.position position

```
You can also use:

```
nodemon server.js audacy.telemetry.position position

```
This will start a NodeJS process to listen to the message queue topic "audacy.telemetry.position" and write to the MongoDB collection "position".

4. After creating a local copy of quindar-platform project, follow these steps to change the directory

```
cd quindar-platform
```

5. Run the following scripts in order to install NodeJS dependencies and libraries.

```
./buildme.sh

```

6. After successful installation of all dependencies, typing the following in your terminal

```
node server.js
```
You can also use:

```
nodemon server.js

```
7. On your terminal, you will see the following message appearing on your terminal "NodeJS Web server listening on port 3000"

8. Now, open your browser and type "http://localhost:3000" to view our main page. Then click on the Message Queue tab and click on any one of the telemetry buttons like attitude,position,vehicle,orbit. Also, specify how many records to be generated.

9. The moment you click on any telemetry tab such as attitude. Subsequently, you can view the received message in the rabbitMQ terminal.


###Excepted Outcome
This tutorial will listen and subscribe to the three topics, and writes to MongoDB database via Quindar-platform REST API.
