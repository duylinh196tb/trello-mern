import { API } from './common';

export default {
  verifyToken: token =>
    API.get(
      'auths/token/verify',
      {},
      { headers: { Authorization: `access_token ${token}` } }
    ),
  login: (params = {}) => API.post('/sessions', params),
  register: (params = {}) => API.post('auths/provider/register', params)
};
