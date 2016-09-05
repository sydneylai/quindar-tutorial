#Introduction to using server
###Web page served securely by Express Web server

###Purpose
Purpose of this tutorial is to run a Web page example more securely by using https served by Express Web server and can also change the port number to 4000.

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
cd tutorial2c
```
Now, run the script buildme.sh in order to install NodeJS dependencies and libraries:

```
./buildme.sh
```
Subsequently, run the scripts buildssl.sh in order to install self-signed SSL certificate for NodeJS with HTTPS:

```
./buildssl.sh
```

After successful installation of all dependencies, then type the following in your terminal

```
nodemon server.js

```
You can also use:

```
node server.js
```

This will let you run HTML page on localhost 3000. On your terminal, you will see the following message appearing on your terminal
"NodeJS Web server listening on port 3000"

###Excepted Outcome
Open your browser and type "https://localhost:3000" to view our index.html page. This is the secured way of viewing your web page. Note, you may want to click on advance settings and then proceed link to go to the web page. You can also change the port to 4000 by following the tutorial2b.

If you want to see the details then you may click error icon present in URL and then click details. Right hand side you will find a button named as "View Certificate". After clicking this button, you will see the certificate.
