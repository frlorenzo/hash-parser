/* index: URL parser function */
/* updated: May 31, 2021 */


/**
 * Parse string containing a `#` followed by the fragment identifier of the URL.
 * This can be taken from `location.hash`. The parse function can use a pattern
 * such as `http://hostname/#resource_name/:id/verb?p=v`. Note that this gets
 * the fragment idetifier part only; from `#` onwards. On success, `parse`
 * function returns an object containing parsed data.
 *
 * @param  {string} hstr The anchor part of a URL. Use `location.hash`
 *
 * @return {Object}      obj
 *
 * @return {String}      obj.id
 *                       Resource id
 *
 * @return {String}      obj.name
 *                       Resource name
 *
 * @return {String}      obj.verb
 *                       Action of request. Ex.: new, update, etc.
 *
 * @return {Object}      obj.query
 *                       The query parameter object
 *
 * @return {String}      obj.path
 *                       The route path/key
 *
 * @example
 * import { parse } from '../index.mjs';
 *
 * console.log(parse('#person/123/view?foo=1&bar=a'));
 *
 * // OUTPUT:
 * // {
 * //   id: '123',
 * //   name: 'person',
 * //   verb: 'view',
 * //   query: { foo: '1', bar: 'a' },
 * //   path: '/person/:id/view'
 * // }
 *
 * @see
 * [Location: hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash)
 */
const parse = (hstr) => {

  // if '' default to '#'
  if (hstr.trim() === '')
    hstr = '#';

  // validate parameter; must be string, preceded with #, /
  if (typeof hstr !== 'string' || hstr[0] !== '#' || hstr[1] === '/')
    throw new Error('Invalid hash parameter ' + hstr);

  let foo = {
    id: '', // resource id
    name: '', // resource name
    verb: '', // resource command
    query: {}, // query parameters
    path: '', // the route path
  };

  let _url, _parts, _path, _mrk;

  // get fragment identifier; # onwards
  _url = hstr ? hstr.slice(1) : '/';

  // get resource name
  _parts = _url.split('/'); // breakdown to parts
  foo.name = _parts[0];

  // get resource id
  foo.id = _parts[1] ? _parts[1].split('?')[0] : '';

  // get resource command
  foo.verb = _parts[2] ? _parts[2].split('?')[0] : '';

  // create route path
  _path = (foo.name ? '/' + foo.name : '/') +
    (foo.id ? "/:id" : '') +
    (foo.verb ? '/' + foo.verb : '');

  // get query parameters if available
  if ((_mrk = _url.indexOf('?')) !== -1) {
    let params = new URLSearchParams(_url.substr(_mrk));

    // get each param to construct query object
    for (let pair of params.entries())
      foo.query[pair[0]] = pair[1];

    // if with ? get the path only, else '/'
    foo.path = _path.split('?')[0] || '/';
  } else
    foo.path = _path; // else use default route path

  return foo;
};


/**
 * Utility to work with query string on the current location after the
 * fragment identifier (after #). This is necessary since URL#search
 * property wouldn't work if the URL is prefixed with hash (URL.hash)
 *
 * @param  {string} hstr The anchor part of a URL. Use `location.hash`
 *
 * @return {URLSearchParams} or null
 *
 * @see
 * [URLSearchParams - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
 * [URLSearchParams - node](https://nodejs.org/dist/latest-v16.x/docs/api/url.html#url_class_urlsearchparams)
 */
const params = (hstr) => {

  // validate parameter; must be string, preceded with #, /
  if (typeof hstr !== 'string' || hstr[0] !== '#' || hstr[1] === '/')
    throw new Error('Invalid hash parameter ' + hstr);

  let i, p;
  if ((i = hstr.indexOf('?')) === -1)
    return null;
  else {
    p = hstr.substr(i + 1);
    if (!p)
      return null;
    else
      return new URLSearchParams(p);
  }
};


export { parse, params };


//- end
