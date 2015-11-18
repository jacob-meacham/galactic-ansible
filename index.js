"use strict";

var ansible = require("./dist/index");
ansible.beginScan(process.argv);

module.exports = ansible;
