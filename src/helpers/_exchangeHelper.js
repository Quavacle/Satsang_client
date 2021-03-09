import Axios from 'axios';
const server =
  process.env.NODE_ENV === 'production'
    ? 'https://bvm-satserver.herokuapp.com'
    : process.env.REACT_APP_LOCAL_DB;

const token = localStorage.getItem('token');
// Book Exchanging

const requestInstance = (instance) => {
  Axios.put(
    server + '/instances/' + instance + '/request',
    {},
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

const acceptRequest = (id, user) => {
  Axios.put(
    server + '/instances/' + id + '/accept',
    {
      acceptedUser: user,
    },
    {
      headers: {
        authorization: token,
      },
    }
  )
    .then((res) => {
      const status = res.status;
      return status;
    })
    .catch((err) => {
      console.error(err);
    });
};

const denyRequest = (instance) => {
  const { id } = instance._id;
  Axios.put(
    server + '/instances/' + id + '/deny',
    {},
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

const returnBook = (id) => {
  Axios.put(
    server + '/instances/' + id + '/return',
    {},
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

const acceptReturn = (id) => {
  Axios.put(
    server + '/instances/' + id + '/accept_return',
    {},
    {
      headers: {
        authorization: token,
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

export {
  requestInstance,
  acceptRequest,
  denyRequest,
  returnBook,
  acceptReturn,
};
