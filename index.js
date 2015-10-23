"use strict";

var traceurRuntimePath = require("traceur").RUNTIME_PATH;
var traceurRuntime = require(traceurRuntimePath);

var ansible = require("./generated/").ansible;
ansible.beginScan();

module.exports = ansible;
