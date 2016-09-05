#Introduction to using server
###Web page served by Express Web server Using different port

###Purpose
Purpose of this tutorial is to run a Web page example by Express Web server and can also change the port number to 4000.

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
cd tutorial2b
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

Now, open your browser and type "http://localhost:3000" to view our index.html page running at port 3000.
This will let you run HTML page on localhost 3000. On your terminal, you will see the following message appearing on your terminal
"NodeJS Web server listening on port 3000"

###Excepted Outcome

Open your browser and type "http://localhost:3000" to view our index.html page served by Express Web server at the specified port. In our case, there are two ports 3000 and 4000.

However, you can change the port to 4000 by running the following commands on your terminal being in the same directory 02.Server-js/tutorial2b

Step 1. Type  ```. ./setNewPort.sh``` on your terminal. Remember to use a dot (i.e. 'source' command in Linux) in front of the shell script setNewPort.sh because this will remember the env variable defined by setNewPort.sh, which is PORT. In order to check that our web server is now listening to 4000, type ```echo $PORT``` in your terminal. You will be able to see 4000 as an output in your terminal.

Step 2. Type ```nodemon server.js``` on your terminal. This will let you know that the web page is running on localhost at 4000 port number. Also, you will see the following message in your terminal "NodeJS Web server listening on port 4000".

Step 3. Finally, open your browse and type "http://localhost:4000" to view our index.html page running at port 4000.

Step 4. If you want to change the port back to 3000, then type ```export PORT=``` in your terminal. In order to make sure that the port has changed then type ```echo $PORT``` and repeat the Steps 2 and 3 in order to make sure it is set it back again to 3000.

Note : node and nodemon commands used to start the server, except nodemon monitors index.html for any changes and updates the website accordingly on refresh.