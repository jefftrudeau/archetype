/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var common = require('./lib/common'),
    pwd = process.env.PWD,
    util = require('util');

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
    ['model', 'route', 'service'].forEach(function (e, i) {
      create_file(__dirname+'/lib/module/'+e+'.js', pwd+'/'+e+'s/'+name+'.js', /%MODULE%/g, name);
    });
    create_file(__dirname+'/lib/module/template.html', pwd+'/templates/'+name+'_index.html', '', '');
  },

  create_project: function (name, others) {
    create_dir(pwd+'/'+name);
    ['models', 'routes', 'services', 'templates'].forEach(function (e, i) {
      create_dir(pwd+'/'+name+'/'+e);
    });
    ['option', 'server'].forEach(function (e, i) {
      create_file(__dirname+'/lib/project/'+e+'.js', pwd+'/'+name+'/'+e+'.js', /%PROJECT%/g, name);
    });
  }

};

(function () {
  var args = process.argv.splice(2),
      _args = {key: args.shift().replace(/-/, '_'), value: args.shift(), others: {}};
  for (var i in args) _args.others[args[i].split(/=/)[0]] = args[i].split(/=/)[1] || true;
  if (typeof(commands[_args.key]) == 'function') {
    console.log(_args.key+' called with '+_args.value+' and '+util.inspect(_args.others));
    commands[_args.key](_args.value, _args.others);
  }
  else console.log('archetype: ' + _args.key + ': command not found');
})();
