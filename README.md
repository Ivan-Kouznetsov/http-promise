## HTTP Promise

A wrapper for Node,js http and https APIs that returns a promise.

## Usage

    const res = await http_promise.request('https://reqres.in:443/api/users/2', 'get', {}, null);

    const res = await http_promise.request(
          'https://reqres.in:443/api/users/',
          'post',
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            name: 'John Doe',
            job: 'DevOps Specialist',
          })
        );
        
## As a promise

     http_promise.request(
        'https://reqres.in:443/api/users/',
          'post',
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            name: 'John Doe',
            job: 'DevOps Specialist',
          })
      ).then(res=>{
        // handle resposnse here
      });
