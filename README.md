# hash-parser

Utility functions for parsing [`location.hash`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash).

## install

```
 npm install github:vanilla-spa/hash-parser
```


## Function: `parse(hstr: string): object`

The `parse` function parses a string containing a `#` followed by the fragment identifier of the URL. This can be taken from `location.hash`. The `parse` function can use a pattern such as `http://hostname/#resource_name/:id/verb?p=v`. Note that this gets the fragment idetifier part only; from `#` onwards. On success, `parse` function returns an object containing parsed data.


**Parameters:**

- `hstr`. The anchor part of a URL. Use [`location.hash`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash) property.


**Returns:**

Returns an *object* containing

- `id`. Resource id
- `name`. Resource name
- `verb`. Action of request. *Ex.: new, update, etc.*
- `query`. Query parameter object
- `path`. Route path/key


**Example:**

```javascript
import { parse } from 'hash-parser';

console.log(parse('#person/123/view?foo=1&bar=a'));
```

Sample output

```javascript
{
  id: '123',
  name: 'person',
  verb: 'view',
  query: { foo: '1', bar: 'a' },
  path: '/person/:id/view'
}
```


**See Also:**

- [Location: hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash)


## Function: `params(hstr: string): URLSearchParams`

The `params()` function is a utility to work with query string on the current location after the fragment identifier (after #). It returns a [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) which enables you to managed query parameters. This is necessary since `URL#search` property wouldn't work if the URL is prefixed with hash (`location.hash`)

**Parameters**

- `hstr`. The anchor part of a URL. Use [`location.hash`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash) property.

**Returns**

- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

**Example:**

```javascript
import { params } from 'hash-parser';

let p = params('#person/123/view?foo=1&bar=a');

console.log('p: ', p.get('foo')); // 1
console.log('p: ', p.get('bar')); // a
```

**See Also:**

- [URLSearchParams - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [URLSearchParams - node](https://nodejs.org/dist/latest-v16.x/docs/api/url.html#url_class_urlsearchparams)
