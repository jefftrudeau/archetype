#!/usr/bin/env node

var common = require('./archetype').common
  , opt = require('optimist')
  , pwd = process.env.PWD
  , util = require('util');

var create_dir = function (path) {
  console.log('creating directory: '+path);
  common.dir.create(path);
};

var create_file = function (src, dst, re, str) {
  console.log('creating file: '+dst);
  common.file.writeFile(dst, common.file.read(src).replace(re, str));
};

var commands = {

  create_module: function (name, others) {
    ['route', 'service'].forEach(function (e, i) {
      create_file(__dirname+'/lib/module/'+e+'.js', pwd+'/'+e+'s/'+name+'.js', /%MODULE%/g, name);
    });
  },

  create_project: function (name, others) {
    create_dir(pwd+'/'+name);
    ['routes', 'services'].forEach(function (e, i) {
      create_dir(pwd+'/'+name+'/'+e);
    });
    ['option', 'server'].forEach(function (e, i) {
      create_file(__dirname+'/lib/project/'+e+'.js', pwd+'/'+name+'/'+e+'.js', /%PROJECT%/g, name);
    });
  }

};

(function () {
  var args = opt.argv._.slice(), min = 2, valid = false;
  if (args.length >= min) {
    var key = args.shift().replace(/-/, '_');
    if (typeof(commands[key]) == 'function') {
      var value = args.shift(), others = {}, valid = true;
      console.log(key+' called with '+value+' and '+util.inspect(others));
      commands[key](value, others);
    }
  }
  if (!valid)
    opt.usage(
'archetype: command-line interface to the archetype web framework for Node.js\n' +
'Usage:\n' +
'    $0 [ action ] < options >\n' +
'Actions: [ create-project PROJECT ]\n' +
'         [ create-module MODULE ]\n' +
'Options: []\n'
    ).demand(['Please enter a valid command.']);
})();
