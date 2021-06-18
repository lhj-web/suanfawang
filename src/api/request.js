import axios from 'axios';
import qs from 'qs';

export function request(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  instance.interceptors.request.use(
    (req) => {
      req.data = qs.stringify(req.data);
      return req;
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => err.response
  );

  return instance(config)
}

export function verifyRequest(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  instance.interceptors.request.use(
    (req) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        req.headers.Authorization = token;
        if (req.data) {
          req.data = qs.stringify(req.data)
        }
        return req;
      }
      return req
    },
    (err) => {
      console.log(err);
      return err.response;
    }
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('token')
      }
      console.log(err.response);
      return err.response
    }
  )

  return instance(config);
}

export function jsonRequest(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(
    (req) => {
      req.data = qs.stringify(req.data);
      return req;
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.log(err);
      return err
    }
  );

  return instance(config);
}

export function uploadRequest(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  instance.interceptors.request.use(
    (req) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        req.headers.Authorization = token;
        console.log(req);
        return req;
      }
      return req
    },
    (err) => {
      console.log(err);
      return err.response;
    }
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.log(err.response);
      return err.response
    }
  );

  return instance(config)
}
