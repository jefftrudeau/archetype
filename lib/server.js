/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var http = require('http')
  , net = require('net')
  , repl = require('repl')
  , common = require('./common')
  , log = require('./log').log
  , memcache = require('./memcache').memcache
  , redis = require('./redis').redis
  , route = require('./route').route
  , option = require('./option').option
  , service = require('./service').service;

this.server = {

  _http: null,

  _repl: null,

  dispatch: function (request, response) {
    try {
      request.__url = common.url.parse(request.url);
      request.__route = route.find(request.url);
      if (request.__route) {
        log.debug('Route found for request ' + request.__url, request.__route);
        service.route(request, response);
      }
      else self.issue(response, 404);
    }
    catch (error) {
      self.issue(response, 500);
      log.error('Server error!', common.exception(error));
    }
  },

  init: function () {
    self.refresh();
    self.start();
  },

  issue: function (response, code) {
    response.writeHead(code, {'Content-Type': 'text/html'});
    response.end();
  },

  refresh: function () {
    try {
      console.log('Refreshing server ...');
      memcache.init();
      redis.init();
      route.init();
      service.init();
    }
    catch (error) {
      throw error;
    }
  },

  start: function () {
    self._http = http.createServer(function (request, response) {
      self.dispatch(request, response);
    }).listen(option.http.port, option.http.host);

    self._repl = net.createServer(function (socket) {
      repl.start('archetype>', socket).context.server = self;
    }).listen(option.repl.port);

    self.status();
  },

  status: function () {
    var msg =
'This instance of archetype is operational and listening for active connections:\n' +
'    (HTTP) http://' + option.http.host + ':' + option.http.port + '/\n' +
'    (REPL) tcp://' + option.repl.host + ':' + option.repl.port + '/';
    log.debug(msg);
    console.log(msg);
  }

};

var self = this.server;
