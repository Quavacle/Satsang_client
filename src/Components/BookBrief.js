import React, { useContext, useState } from 'react';
import { createInstance } from '../helpers/_crudHelper';
import { AlertContext } from '../providers/alertProvider';
import RequestModal from './Modals/RequestModal';
import { ButtonStyles } from './styles/ButtonStyles';
import BookBriefStyles from './styles/BookBriefStyles';
import { Link } from 'react-router-dom';

const BookBrief = (props) => {
  const [openRequest, setOpenRequest] = useState(false);
  const { addMessage } = useContext(AlertContext);
  const { _id, title, authors, imageLinks } = props.book;
  const instId = props?.instances[0]?._id;
  const mapAuth = () => {
    return authors.map((authieboy, index) => <li key={index}>{authieboy}</li>);
  };

  const handleAdd = () => {
    createInstance(props.book);
    addMessage('Book added!', props.book.title);
  };

  const handleRequest = () => {
    setOpenRequest(!openRequest);
  };

  return (
    <>
      {openRequest ? (
        <RequestModal
          setOpenRequest={setOpenRequest}
          allBooks={props.instances}
        />
      ) : null}
      <BookBriefStyles key={_id}>
        <div className='header'>
          <h1>
            <Link to={'/detail/' + instId}>{title}</Link>
          </h1>
          {imageLinks && <img src={imageLinks?.thumbnail} alt={title} />}
          <ul>{authors ? mapAuth() : null}</ul>
        </div>
        <div className='inputs'>
          {props.search && (
            <ButtonStyles onClick={handleAdd}>Add to Collection!</ButtonStyles>
          )}
          {props.request && (
            <ButtonStyles onClick={handleRequest}>
              Request this book
            </ButtonStyles>
          )}
        </div>
      </BookBriefStyles>
    </>
  );
};

export default BookBrief;
