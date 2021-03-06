import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookBrief from '../Components/BookBrief';
import InputStyles from '../Components/styles/InputStyles';
import HeaderStyles from '../Components/styles/HeaderStyles';
import {
  ContainerStyles,
  ShellStyles,
} from '../Components/styles/ContainerStyles';

const server =
  process.env.NODE_ENV === 'production'
    ? 'https://bvm-satserver.herokuapp.com'
    : process.env.REACT_APP_LOCAL_DB;

const Browse = () => {
  const [books, setBooks] = useState(null);
  const [display, setDisplay] = useState(null);
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    Axios.get(server + '/instances/index', {})
      .then((res) => organizeBooks(res.data))
      .catch((err) => console.error(err));

    function organizeBooks(instances) {
      const organized = instances.reduce((acc, current) => {
        if (current.book === null) return acc;
        const currentBookId = current.book._id;
        if (!acc[currentBookId]) {
          acc[currentBookId] = [];
        }
        acc[currentBookId].push(current);
        return acc;
      }, {});
      setBooks(organized);
    }
  }, []);

  const handleChange = (e) => {
    setDisplay(e.target.value.toLowerCase());
    const bookArray = Object.values(books).flat();
    const filtered = bookArray.filter((x) =>
      x.book.title.toLowerCase().includes(display)
    );
    setFiltered(filtered);
  };
  if (books === null) return <p>Loading . . .</p>;

  return (
    <ShellStyles>
      <HeaderStyles>Request A Book</HeaderStyles>
      <InputStyles
        name='search'
        type='text'
        placeholder='Search here!'
        onChange={(e) => handleChange(e)}
      />
      <ContainerStyles>
        {filtered
          ? filtered.map((book) => {
              return (
                <>
                  <BookBrief book={book.book} instances={[book]} request />
                </>
              );
            })
          : Object.values(books).map((book) => {
              return (
                <>
                  <BookBrief book={book[0]?.book} instances={book} request />
                </>
              );
            })}
      </ContainerStyles>
    </ShellStyles>
  );
};

export default Browse;
