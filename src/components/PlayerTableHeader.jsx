/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { sortProductMetrics } from '../appState/players';
import styles from './PlayerTableHeader.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import upArrow from '../../public/ascending-svgrepo-com.svg';
export default function PlayerTableHeader() {
  const [sortOrder, setSortOrder] = useState({
    name: null,
    winnings: null,
    country: null,
  });
  const dispatch = useDispatch();

  const sort = (attribute) => {
    if (sortOrder[attribute] == null) {
      setSortOrder({ [attribute]: 'asc' });
      dispatch(sortProductMetrics({ attribute, order: 'asc' }));
    } else {
      let s = sortOrder[attribute] == 'asc' ? 'des' : 'asc';
      setSortOrder({ [attribute]: s });
      dispatch(sortProductMetrics({ attribute, order: s }));
    }
  };
  return (
    <thead>
      <tr>
        <th className={cn(styles.cell, styles.avatar)} />
        <th
          className={cn(styles.cell, styles.player)}
          onClick={() => sort('name')}
        >
          <span className={styles.sortSpan}>
            Player Name
            {sortOrder.name == null ? (
              ''
            ) : sortOrder.name === 'asc' ? (
              <img
                className={styles.sortIcon}
                src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png"
                alt="Asc"
              />
            ) : (
              <img
                className={styles.sortIcon}
                src="https://img.icons8.com/ios-filled/100/000000/generic-sorting.png"
                alt="des"
              />
            )}
          </span>
        </th>
        <th
          className={cn(styles.cell, styles.winnings)}
          onClick={() => sort('winnings')}
        >
          <span className={styles.sortSpan}>
            Winnings
            {sortOrder.winnings == null ? (
              ''
            ) : sortOrder.winnings === 'asc' ? (
              <img
                className={styles.sortIcon}
                src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png"
                alt="Asc"
              />
            ) : (
              <img
                className={styles.sortIcon}
                src="https://img.icons8.com/ios-filled/100/000000/generic-sorting.png"
                alt="des"
              />
            )}
          </span>
        </th>
        <th
          className={cn(styles.cell, styles.country)}
          onClick={() => sort('country')}
        >
          <span className={styles.sortSpan}>
            Country
            {sortOrder.country == null ? (
              ''
            ) : sortOrder.country === 'asc' ? (
              <img
                className={styles.sortIcon}
                src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png"
                alt="Asc"
              />
            ) : (
              <img
                className={styles.sortIcon}
                src="https://img.icons8.com/ios-filled/100/000000/generic-sorting.png"
                alt="des"
              />
            )}
          </span>
        </th>
        <th className={cn(styles.cell, styles.country)}>Actions</th>
      </tr>
    </thead>
  );
}
