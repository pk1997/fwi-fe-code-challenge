import ReactPaginate from 'react-paginate';
import Table from './PlayerTable';
import { getPlayers } from '../appState/players';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchAllPlayers } from '../appState/players';
import styles from './pagination.module.scss';

export default function PlayerTable({ itemsPerPage }) {
  const players = useSelector(getPlayers);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(players.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(players.length / itemsPerPage));
  }, [dispatch, itemOffset, itemsPerPage, players]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % players.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Table players={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        renderOnZeroPageCount={null}
        subContainerClassName="pages pagination"
      />
    </>
  );
}
