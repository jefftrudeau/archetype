/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

this.index = function (request, response) {
  response.writeHead(200, {'Content-Type': request.__route.mime});
  response.end(request.headers['user-agent']);
};
