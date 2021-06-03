import axios from 'axios';
// import qs from 'qs';

export function request(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  instance.interceptors.request.use(
    (req) => req,
    // req.data = qs.stringify(req.data);

    (err) => {
      console.log(err);
      return err;
    }
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.log(err);
      return err;
    }
  );

  return instance(config);
}

export function verifyRequest(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  instance.interceptors.request.use(
    (req) => req,
    // const token = window.localStorage.getItem('token')
    // if (token) {
    //   req.headers.Authorization = `JWT ${token}`;
    //   if (req.url === '/device/device' && req.method === 'put') {
    //     console.log(req);
    //     console.log(req.data);
    //     return req
    //   }
    //   if (req.data) {
    //     req.data = qs.stringify(req.data)
    //   }
    //   return req;
    // }
    // window.location.pathname = '/login'
    // window.location.reload()

    (err) => {
      console.log(err);
      return err;
    }
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => err
  )

  return instance(config);
}
