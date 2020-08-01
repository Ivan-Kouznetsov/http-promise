import * as http_promise from '../';

describe('HTTP Promise', () => {
  it('it should fetch', async () => {
    const res = await http_promise.request('https://reqres.in/api/users/2', 'get', {}, null);

    expect(res.error).toBeNull();
    expect(res.response).toBeTruthy();
  });

  it('it should fetch when port is provided', async () => {
    const res = await http_promise.request('https://reqres.in:443/api/users/2', 'get', {}, null);

    expect(res.error).toBeNull();
    expect(res.response).toBeTruthy();
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

    expect(res.error).toBeNull();
    expect(res.response).toBeTruthy();
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

    expect(res.error).toBeNull();
    expect(res.response).toBeTruthy();
    expect(res.response.headers).toBeTruthy();
    expect(res.response.status).toBeGreaterThanOrEqual(200);
  });

  it('it should post text', async () => {
    const postRes = await http_promise.request('http://localhost:3030/posts/', 'post', {}, 'Hello world');

    expect(postRes.error).toBeNull();
    expect(postRes.response).toBeTruthy();
    expect(postRes.response.headers).toBeTruthy();
    expect(postRes.response.status).toBeGreaterThanOrEqual(200);

    const getRes = await http_promise.request('http://localhost:3030/lastpost', 'get', {}, null);

    expect(getRes.error).toBeNull();
    expect(getRes.response).toBeTruthy();
    expect(getRes.response.headers).toBeTruthy();
    expect(getRes.response.status).toBeGreaterThanOrEqual(200);
  });
});
