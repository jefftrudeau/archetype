/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var http = require('http'),
    common = require('./common'),
    database = require('./database').database,
    log = require('./log').log,
    route = require('./route').route,
    option = require('./option').option,
    service = require('./service').service,
    template = require('./template').template;

this.server = {

  _http: null,

  dispatch: function (request, response) {
    try {
      request.__url = common.url.parse(request.url);
      request.__route = route.find(request.url);
      if (request.__route) {
        log.debug('Route found for request ' + request.__url, request.__route);

        var data = service.route(request, response);
        var file = response.__template || request.__route.template;

        data = template.render(file, data);
        response.end(data);
      }
      self.issue(response, 404, {url: request.url});
    }
    catch (error) {
      var e = common.exception(error);
      self.issue(response, 500, {error: e.toHtml()});
      log.error('Server error!', e);
    }
  },

  init: function () {
    self.refresh();
    self.start();
  },

  issue: function (response, code, data) {
    response.writeHead(code, {'Content-Type': 'text/html'});
    response.end(template.render(code, data));
  },

  refresh: function () {
    try {
      database.init();
      route.init();
      service.init();
      template.init();
    }
    catch (error) {
      throw error;
    }
  },

  start: function () {
    self._http = http.createServer(function (request, response) {
      self.dispatch(request, response);
    });
    self._http.listen(option.http.port, option.http.host);
    console.log('http://' + option.http.host + ':' + option.http.port + '/');
    //TODO receive input from command-line and execute commands accordingly
  }

};

var self = this.server;
