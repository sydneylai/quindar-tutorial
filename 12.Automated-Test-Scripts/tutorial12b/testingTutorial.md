###Purpose
The smoke test can be run quickly in an automated manner for each commonly used REST APIs.

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
cd tutorial12b
```

2. Run a smoke test by running "smoketest01.sh", e.g.

```
cd test
./smoketest01.sh
```

###Expected Outcome

This test will help you to know which API server is available or if any REST API fails to operate. It produces 2 output files:

automatedTest-log-YYYY-MM-DD.log - a list of tests with successful results.
automatedTest-err-YYYY-MM-DD.log - a list of tests that failed.

