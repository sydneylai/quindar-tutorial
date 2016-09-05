//The following is ignored by nodejs because it is not exported, it defines the system settings for the browser.
//  8/5/2016 RayL: need to update the dbPort/port semantics as widgets use it. 
// quindar widgets use the following endpoint and ports
var platform = 'devops02.audacy.space';
var dbPort = 4101; // REST API for mq
var port = 4103;   // websockets

// webSocketEndpoint: used by socketConsole.js
var webSocketEndpoint = 'ws://devops02.audacy.space:4103'; 
