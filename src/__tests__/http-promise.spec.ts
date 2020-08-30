import * as http_promise from '../';
import { restPort } from './__server__/testServer';

const localhost = `http://localhost:${restPort}/`;

describe('HTTP Promise', () => {
  it('it should fetch', async () => {
    const res = await http_promise.request('https://reqres.in/api/users/2', 'get', {});

    expect(res.json).toBeTruthy();
  });

  it('it should fetch xml', async () => {
    const res = await http_promise.request(`${localhost}xml`, 'get', {});

    expect(JSON.stringify(res.json)).toEqual(
      '{"plane":{"year":"1977","make":"Cessna","model":"Skyhawk","color":"Light blue and white"}}'
    );
  });

  it('it should fetch with a query', async () => {
    const res = await http_promise.request('https://reqres.in/api/users/2?aaa=1&bbb=2&ccc=3', 'get', {});

    expect(res.json).toBeTruthy();
  });

  it('it should fetch when port is provided', async () => {
    const res = await http_promise.request('https://reqres.in:443/api/users/2', 'get', {});

    expect(res.json).toBeTruthy();
  });

  it('it should post', async () => {
    const res = await http_promise.request(
      'https://reqres.in:443/api/users/',
      'post',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        name: 'John Doe',
        job: 'DevOps Specialist',
      })
    );

    expect(res.json).toBeTruthy();
  });

  it('it should get status code and headers', async () => {
    const res = await http_promise.request(
      'https://reqres.in:443/api/users/',
      'post',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        name: 'John Doe',
        job: 'DevOps Specialist',
      })
    );

    expect(res.json).toBeTruthy();
    expect(res.headers).toBeTruthy();
    expect(res.status).toBeGreaterThanOrEqual(200);
  });

  it('it should post text', async () => {
    const postRes = await http_promise.request(`${localhost}posts/`, 'post', {}, 'Hello world');

    expect(postRes.json).toBeTruthy();
    expect(postRes.headers).toBeTruthy();
    expect(postRes.status).toBeGreaterThanOrEqual(200);

    const getRes = await http_promise.request(`${localhost}lastpost`, 'get', {});

    expect(getRes.json).toBeTruthy();
    expect(getRes.headers).toBeTruthy();
    expect(getRes.status).toBeGreaterThanOrEqual(200);
  });
});
