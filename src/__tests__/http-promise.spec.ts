import * as http_promise from '../';

describe('HTTP Promise', () => {
  it('it should fetch', async () => {
    const res = await http_promise.request('https://reqres.in/api/users/2', 'get');

    expect(res.json).toBeTruthy();
  });

  it('it should fetch via http2', async () => {
    const res = await http_promise.request('https://reqres.in/api/users/2', 'get', true);
    console.log(res);
    expect(res.json).toBeTruthy();
  });

  it('it should fetch when port is provided', async () => {
    const res = await http_promise.request('https://reqres.in:443/api/users/2', 'get');

    expect(res.json).toBeTruthy();
  });

  it('it should post', async () => {
    const res = await http_promise.request(
      'https://reqres.in:443/api/users/',
      'post',
      false,
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
      'post',false,
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
    const postRes = await http_promise.request('http://localhost:3030/posts/', 'post',false,{}, 'Hello world');

    expect(postRes.json).toBeTruthy();
    expect(postRes.headers).toBeTruthy();
    expect(postRes.status).toBeGreaterThanOrEqual(200);

    const getRes = await http_promise.request('http://localhost:3030/lastpost', 'get',false, {});

    expect(getRes.json).toBeTruthy();
    expect(getRes.headers).toBeTruthy();
    expect(getRes.status).toBeGreaterThanOrEqual(200);
  });
});
