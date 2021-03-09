import Axios from 'axios';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://bvm-satserver.herokuapp.com'
    : process.env.REACT_APP_LOCAL_DB;

let token = localStorage.getItem('token');

// Book CRUD

async function createInstance(book) {
  let token = localStorage.getItem('token');
  Axios.post(server + '/instances/create', book, {
    headers: {
      authorization: token,
    },
  })
    .then(async (res) => {
      const book = await res.book;
      return book;
    })
    .catch((err) => {
      return {
        err: [err],
      };
    });
}

const updateInstance = (instance) => {
  const { id } = instance._id;
  Axios.put(
    server + '/instances/' + id + '/update',
    { instance },
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const updatedBook = res.data.book;
    return updatedBook;
  });
};

const deleteInstance = (id) => {
  Axios.delete(server + '/instances/' + id + '/delete', {
    headers: {
      authorization: token,
    },
  }).then((res) => {
    const result = res;
    return result;
  });
};

// Dashboards/Index

async function getDashboard() {
  let token = localStorage.getItem('token');
  return Axios.get(server + '/dashboard', {
    headers: {
      authorization: token,
    },
  })
    .then(async (res) => {
      const data = await res.data;
      return data;
    })
    .catch((err) => {
      return {
        err: [err],
      };
    });
}

// Detail Page

async function getDetail(id) {
  Axios.get(server + '/instances/' + id)
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export {
  createInstance,
  updateInstance,
  deleteInstance,
  getDashboard,
  getDetail,
};
