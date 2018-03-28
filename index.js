// const vk = require('vk-dirty-api');
const extend = require('xtend');
const request = require('request-promise');
const fs = require('fs');
// access_token: 8765a9d2472dbf8a8ebbc32476bedbccff83f558884a00fc5dbf05c85d7ad5525ccb4b5d6a53f92e91d76
const SERVICE_KEY = '7cc007f77cc007f77cc007f7a67ca211c577cc07cc007f7267b9c1c9c1806427eea8470';
const api = apiVk(SERVICE_KEY);


function apiVk(token, version) {

  return function (method, params) {
    return request.get('https://api.vk.com/method/' + method, {
      qs: extend(params, { v: version || '5.21', access_token: token }),
      json: true,
      resolveWithFullResponse: true
    }).then(function (r) {
      if (r.body.hasOwnProperty('error')) {
        throw new errors.VKAPIError(r.body.error.error_code, r.body.error.error_msg);
      }

      if (!r.body.hasOwnProperty('response')) {
        throw new Error('No `response` field in API response');
      }

      return r.body.response;
    });
  };
}


api('wall.get', { owner_id: '-20629724', count: 2, offset: 1})
  .then(post => {

    console.log(post);
    fs.writeFileSync('./post.json', JSON.stringify(post));
    
  })
  .catch(err => console.error('Unable to complete API request', err));