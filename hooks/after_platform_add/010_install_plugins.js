#!/usr/bin/env node

//this hook installs all your plugins

// add your plugins to this list--either the identifier, the filesystem location or the URL
var pluginlist = [
    //"com.ludei.webview.plus",
    "cordova-plugin-console@1.0.2",
    "cordova-plugin-device@1.1.1",
    "cordova-plugin-dialogs@1.2.0",
    //"cordova-plugin-screen-orientation",
    "cordova-plugin-splashscreen@3.2.0"
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout);
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});