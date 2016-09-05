# Quindar Platform Design Overview
Updated: Jun 21, 2016 

## Overview
Quindar platform consists of the following infrastructural components:
* Web server (server.js) - NodeJS express server engine serving as HTTP and HTTPS server.
* WebSocket server 
* RabbitMQ server
* MongoDB replica set (noSQL database cluster)

We have built the following functional modules:
* Admin console 
  - Data Generator - generate test data for (1) WebSocket data streaming (real time streaming spacecraft telemetry and geo-position data); (2) writing telemetry data to message queue, (3) writing directly to MongoDB database.
  - Data Browser - browsing database contents without using JavaScript or native MongoDB commands
  - Metrics - simple D3.js chart to report on data traffic and trending

* Helper class - data simulator to generate telemetry data for (1) attitude, (2) position, (3) spacecraft vehicle, and (4) orbit trajectory.

* Modular server design - a simple server configuration file to enable or disable any of the above infrastructure components.

* Built-in hook for Passport (single sign-on and security token server to support JSON Web Token and/or OAuth).

You can use Quindar platform independently without using the Quindar application, say, 
* As a data streaming server
* As backend database for your mission operations application

You can also use Quindar platform as the backend for your open source mission operations application using Quindar application (aka Quindar-angular) with GMAT mission operations planning software.


# Architecture Design Principles

## Modularity - Micro-services
Quindar platform consists of several backend technologies, including REST Web services, messaging (initially RabbitMQ), real-time data streaming and data services (initially MongoDB). The core server is built using NodeJS. From deployment perspective, these technologies should be deployed in different server instances for horizontal scaling. However, with modular component design, we can also deploy them in all-in-one container for demo or testing purpose.

The section will discuss the modular design, and the Micro-services architecture principles behind the scene.

### Server modules
  * HTTP module - all REST APIs served in unencrypted http port
  * HTTPS module - REST APIs served in secure HTTPS data transport using a StartSSL SSL certificate.
  * RabbitMQ module - integration with RabbitMQ via AMPQ messaging protocol, and the REST API to read/write to the message queue.
  * WebSocket module - integration with socket.io data streaming.
  * secure WebSocket module - WebSocket over SSL. 

### Deployment by Modules - the startup NodeJS server script reads /config/systemSettings.js, and will load the relevant modules. You can disable certain module by setting False, e.g.

```
'serverStartupOptions': {
    'apiHttp': true,
    'apiHttps': true,
    'socketHttp': true,
    'socketHttps': true
  }
```

### Micro-services approach
Micro-services refer to the software architecture approach to deploy small Web services in self-contained server nodes, without external dependencies. Martin Fowler depicts them as "independently deployable services." For example, we can deploy a simple REST Web service to report on the satellite temperature at real time on a NodeJS docker container, without depending on other external system dependencies such as separate HTTP Web server.

A few features of deploying micro-services include (1) the capability to scale horizontally by adding more server instances,or to scale vertically by adding more computing and memory power to the underlying server container.  (2) the REST API is independent and self-contained by deploying all components and dependencies into one single logical unit. (3) the Web service is agnostic of the user location, or the data center location. In other words, you can deploy the Web service in any data center location without changing the URI or server end-points. (4) the Web service can be high available by adding appropriate monitoring and self-healing capability such as Amazon Lambda. In our case, we plan to deploy REST Web services in docker container infrastructure, where we will add self-healing capability using docker swarm, consul and optionally mesosphere. 

The benefit of using NodeJS is that NodeJS application is asynchronous and non-blocking, and can be as an independent "thread" for each REST Web service.
 
Currently, we have several groups of micro-services:
* Telemetry for satellites - read and write from MongoDB database
* Messaging - sending and receiving telemetry via RabbitMQ messaging protocol
* Data streaming - real-time sending and receiving telemery via socket.io WebSocket streaming protocol
 
## Integration Capability
* You can add your telemetry data source by using either (1) REST API, (2) AMPQ messaging protocol, (3) WebSocket protocol.

* Standard interface definition can be found under http://platform.audacy.space:7902/api.  There are examples with documented error messages.

* Steps in adding new data sources
If customers have their own data sources from their satellites, they can integrate (e.g. ingest, pump, publish) their data into Audacy platform by either:
  * Read the API interface definition under http://platform.audacy.space:7902/api
  * For REST API users, you can format your JSON data payload as per API definition. For example, if you want to transmit a satellite position telemetry data point, your JSON payload may look like:

```
/POST https://platform.audacy.space:7903/services/v1/position
{"vehicleId":"IBEX","x":158565.2009,"y":148104.098,"z":5207.584894,"vx":-1.151578,"vy":0.17722,"vz":0.46557}
```
  * For RabbitMQ users, they can use REST API to write their satellite telemetry data into RabbitMQ services, which will process (e.g. uplink, relay, transcode) for the target recipients. For example,

```

``` 

  * For advanced RabbitMQ users who require deep integration, they can write directly to Audacy RabbitMQ services by using the RabbitMQ server end-point data04.audacy.space/develop but you need to request a system user account from AudacyDevOps administrator before hand.  Currently, Audacy RabbitMQ uses RabbitMQ exchange "quindarExchange04" with topic names audacy.telemetry.attitude, audacy.telemetry.position, audacy.telemetry.vehicle and audacy.telemetry.orbit for each telemetry type.

  

## Scalability Considerations
* You can use Docker v1.12 (https://blog.docker.com/2016/06/docker-1-12-built-in-orchestration/)  to build your Quindar micro-services with the new Docker orchestration. It can scale horizontally by adding more containers given a service level objective, e.g.

```
%docker service scale frontend=100
``` 

## Availability Considerations
* You can use Consul to collect heart beats from each Quindar docker container. Consul can help manage availabilty by adding new instances if the existing docker container loses its heart beat.

