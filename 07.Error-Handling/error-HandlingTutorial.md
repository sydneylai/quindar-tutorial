###Purpose
This tutorial will demonstrate how to handle errors when code breaks.

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
cd 07.Error-Handling
cd tutorial7a
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

Second link will post data to Mongodb database and will throw error if the code break such as server is not working.

##HTTP status code

There is a standard number designation for the type of errors that your code can throw, called status codes, and for detailed information we can be found here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

The codes we are concerned with are 200 - OK, 404 - Files/ Directory not found, and 500 - Internal server error. For instance, in module01.js, will handle error

```javascript
     positionData.save(function(err) {
      // example 1: now you can add this if err block within the positionData.save(), then the error handling will work.
      if (err) {
        return res.status(500).send({"status": 500, "message": "Cannot insert position data points due to internal system error",
          "type":"internal", "error": err});
      };

      // if no error
      return res.status(200).send( {"status": 200, "message": "insert position data points", "data": positionData} );
    });
```
There are situation when server is not working, it then sends an error message "Cannot insert position data points due to internal system error" with HTTP status code as 500.

However, in server.js file, if you add error handling block, like the following then REST API /verifyMe will always fail as err is always true. In this case, error wont be handled and will not execute the err block.

```javascript
    app.get('/verifyMe', function(req, res) {
      // we can add cross-domain support here so that local browser with localhost domain can still access this web service
      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      /** example 2: if you add this block, the REST API /verifyMe will always fail because err (handler) is always true
      if (err) {
        return res.status(500).send({"status": 500, "message": "Quindar server is not running due to internal server error",
            "error": err})
      };
      **/
      return res.status(200).send({"status": 200, "message": "Quindar platform is alive"});
    });
```

###Excepted Outcome
If any errors are encountered during the execution of the program, it will be handled and error message will be displayed.
