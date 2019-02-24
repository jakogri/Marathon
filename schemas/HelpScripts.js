'use strict';

var nconf = require('nconf');
var path = require('path');
nconf.argv()
	.env()
	.file({file: path.join(__dirname, 'config.json')});

exports.ConnectStr = function ()
{
    var ConnectString = 'mongodb://';
    if ((nconf.get("user") != "") && (nconf.get("pass") != ""))
        ConnectString = ConnectString + nconf.get("user") + ':' + nconf.get("pass") + '@';
    ConnectString = ConnectString + nconf.get("uri");
    if (nconf.get("port") != "") ConnectString = ConnectString + ':' + nconf.get("port");
    ConnectString = ConnectString + '/' + nconf.get("database");
    return ConnectString
};

exports.sleep = function (milliseconds) {
    var start = Date.now();
    for (var i = 0; i < 1e7; i++) {
        if ((Date.now() - start) >= milliseconds){
            return;
        }
    }
};

exports.NodePort = function ()
{
    return (parseInt(nconf.get("node_port")));
}

 exports.NodePort = function ()
 {
  return (parseInt(nconf.get("node_port")));   
 }
