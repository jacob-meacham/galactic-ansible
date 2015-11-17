"use strict";

var ansible = require("./dist/index");
ansible.beginScan(true);

module.exports = ansible;
