const axios = require("axios");

const _get = async (url, token) => {
  return await axios.get(url, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-GB,en;q=0.8",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      cookie: `authenticator=${token}`,
      Referer: "https://intra.etna-alternance.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
};

const _post = async (url, data, token) => {
  return await axios.post(url, data, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-GB,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      ...(token ? { Referer: "https://intra.etna-alternance.net/" } : {}),
      ...(token ? { cookie: `authenticator=${token}` } : {}),
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
};
module.exports = {
  _get,
  _post,
};
