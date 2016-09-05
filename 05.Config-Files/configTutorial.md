###Purpose
The purpose of this tutorial is to warp up all the sensitive information under config folder. As and when necessary you may retrieve database credentials from config folder.

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
cd 05.Config-Files
cd tutorial5a
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

This will let you run HTML page on localhost 3000. On your terminal, you will see the following message appearing on your terminal
"NodeJS Web server listening on port 3000"

Now, open your browser and type "http://localhost:3000" to view our index.html page. First link check whether system heartbeat. Alternatively, you download and install curl utility and type the following ``` curl -X GET http://localhost:3000/verifyMe ```.

Second link will post data to Mongodb database by using system setting specified in config/systemSettings.js, and file is called in module01.js. In this way, sharing of system settings can be more secured.

###Excepted Outcome
The purpose is to share sensitive information across the application in a more secured and organised way rather than hard coding the credentials in a variable. For example, we should not hard code username and password in main source codes instead we should use config files, e.g. ``` var systemSettings = require('../../config/systemSettings.js');```



