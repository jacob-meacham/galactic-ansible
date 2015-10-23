"use strict";

var ansible = require("./generated/").ansible;
ansible.beginScan();

module.exports = ansible;
