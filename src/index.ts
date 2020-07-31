import * as http from 'http';
import * as https from 'https';

/**
 * Helpers
 */

const splitUrl = (url: string) => {
  // https://tools.ietf.org/html/rfc3986#appendix-B
  const parts = url.trim().match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
  const protocol = parts[2];
  const rawHostname = parts[4];
  const path = parts[5];
  const port = /:\d+/.test(rawHostname) ? /(?<=:)\d+/.exec(rawHostname)[0] : null;

  return { protocol, hostname: /(\w|\.)+(?=:{0,1})/.exec(rawHostname)[0], path, port };
};

export const request = (
  url: string,
  method: string,
  headers: { [key: string]: string },
  body: string
): Promise<{ error: string; response: object }> => {
  const urlParts = splitUrl(url);

  return new Promise((resolve, _) => {
    if (['http', 'https'].includes(urlParts.protocol.toLowerCase()) === false) {
      resolve({ error: 'Only http and https supported', response: null });
      return;
    }

    const options = {
      protocol: urlParts.protocol + ':',
      hostname: urlParts.hostname,
      port: urlParts.port ?? (urlParts.protocol === 'http' ? 80 : 443),
      path: urlParts.path,
      method: method,
      headers: headers,
    };

    const req = (urlParts.protocol === 'http' ? http : https)
      .request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({ response: JSON.parse(data), error: null });
        });
      })
      .on('error', (err) => {
        resolve({ error: err.message, response: null });
      });

    if (body) req.write(body);
    req.end();
  });
};
