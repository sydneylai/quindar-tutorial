#Getting started with Mocha
Mocha is a testing library for Node.js, created to be a simple, extensible, and fast testing suite. It's used for unit and integration testing, and it's a great candidate for BDD (Behavior Driven Development).

###Quindar Platform Backend Testing Using Mocha and Chai
This project will create backend (e.g. REST API) test scripts and set up and perform end to end testing for Quindar Platform. The overall Quindar backend testing will be able to test all the REST APIs.

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
cd 12.Automated-Test-Scripts
cd tutorial12a
```

2. Run the following scripts in order to install NodeJS dependencies and libraries.

```
./buildme.sh

```

3. After successful installation of all dependencies, then type the following in your terminal in order to test

```
mocha --timeout 5000

```

###Excepted Outcome
This tutorial will perform automated test scripts by using Mocha and chai. It will display the number of pass and fail cases. If the test cases are failed then there might be an error which needs to be fixed.

###Summary
Mocha is a nice and easy DSL that makes writing tests cases quickly. Mocha's strength comes from its modularity, and using Chai styles provide an expressive language & readable style.