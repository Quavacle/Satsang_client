import Axios from 'axios';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://bvm-satserver.herokuapp.com'
    : process.env.REACT_APP_LOCAL_DB;

// User requests

function login(info) {
  return Axios.post(server + '/login', info, {}).then(async (res) => {
    const token = await res.data.token;
    localStorage.setItem('token', token);
    return res.data.user;
  });
}

function register(info) {
  return Axios.post(server + '/register', info, {}).then(async (res) => {
    const user = await res.data;
    const token = await user.token;
    localStorage.setItem('token', token);
    return user;
  });
}

// @@ TODO: Add server side response to remove token
const logout = (token) => {
  Axios.post(server + '/logout', token).then((res) => {
    const status = res.status;
    return status;
  });
};

// User Profile

const getProfile = (username) => {
  Axios.get('/' + username)
    .then((res) => {
      const profile = res.data;
      return profile;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
export { login, register, logout, getProfile };
