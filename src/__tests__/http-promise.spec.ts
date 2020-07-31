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
});
