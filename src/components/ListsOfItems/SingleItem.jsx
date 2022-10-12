const SingleItem = ({ name, price, id }) => {
  return <button aria-label="change sort order" id={id} onClick={() => {

  }}>{name},{price}</button>;
};

export default SingleItem;
