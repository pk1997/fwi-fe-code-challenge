import React, { useState } from 'react';
import styles from './modal.module.scss';
import { useDispatch } from 'react-redux';
import { addPlayer, editPlayer } from '../appState/players';
import { COUNTRIES } from '../constants/countries';
import { isValidHttpUrl } from '../constants/helpers';

const AddPlayer = ({ setIsOpen, initialPlayer = {} }) => {
  const [formData, setFormData] = useState({
    name: initialPlayer.name,
    imageUrl: initialPlayer.imageUrl,
    country: initialPlayer.country,
    winnings: initialPlayer.winnings,
  });
  const [error, setErrors] = useState({
    fields: [],
  });

  const dispatch = useDispatch();
  const onCancel = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      error.fields.length == 0 &&
      formData.name !== null &&
      formData.winnings !== null &&
      formData.country !== null
    ) {
      if (initialPlayer.id) {
        dispatch(editPlayer({ ...formData, id: initialPlayer.id })).unwrap();
        setIsOpen(false);
        alert('Player Edited');
      } else {
        dispatch(addPlayer(formData)).unwrap();
        setIsOpen(false);
        alert('Player Added');
      }
    }
  };
  const sortAndGetKeys = (COUNTRIES) => {
    return Object.keys(COUNTRIES).sort((a, b) => COUNTRIES[a] > COUNTRIES[b]);
  };
  const onValueChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setFormData({ ...formData, name: e.target.value });
        break;
      case 'image_url':
        if (!isValidHttpUrl(e.target.value)) {
          setErrors({
            fields: [...error.fields, 'imageUrl'],
          });
        } else {
          setErrors({
            fields: error.fields.filter((field) => field !== 'imageUrl'),
          });
        }
        setFormData({ ...formData, imageUrl: e.target.value });
        break;
      case 'winnings':
        if (!Number.isInteger(parseInt(e.target.value))) {
          setErrors({
            fields: [...error.fields, 'winnings'],
          });
        } else {
          setErrors({
            fields: error.fields.filter((field) => field == 'imageUrl'),
          });
          setFormData({ ...formData, winnings: parseInt(e.target.value) });
        }
        break;
      case 'country':
        setFormData({ ...formData, country: e.target.value });
        break;
    }
  };
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{`${
              initialPlayer.id ? 'Edit' : 'Add'
            } Player `}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
          </button>
          <div className={styles.modalContent}>
            <form onSubmit={onSubmit}>
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                className={styles.inputText}
                id="name"
                name="name"
                placeholder="Player name...."
                onChange={onValueChange}
                value={formData.name}
                required
              />
              {error.fields.includes('name') && (
                <p className={styles.error}>Please Enter Name</p>
              )}
              <label htmlFor="Image">Image URL</label>
              <input
                className={styles.inputText}
                id="image_url"
                name="image_url"
                placeholder="Image URL"
                onChange={onValueChange}
                value={formData.imageUrl}
              />
              {error.fields.includes('imageUrl') && (
                <p className={styles.error}>Please Enter Valid URL</p>
              )}
              <label htmlFor="winnings">Winnings</label>
              <input
                type="number"
                className={styles.inputText}
                id="winnings"
                name="winnings"
                placeholder="winnings"
                required
                onChange={onValueChange}
                value={formData.winnings}
              />
              {error.fields.includes('winnings') && (
                <p className={styles.error}>Please Enter Valid Number</p>
              )}
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                className={styles.inputSelect}
                onChange={onValueChange}
                value={formData.country}
                required
              >
                <option key={''} value={''}>
                  {''}
                </option>
                {sortAndGetKeys(COUNTRIES).map((code) => (
                  <option key={code} value={code}>
                    {COUNTRIES[code]}
                  </option>
                ))}
              </select>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  className={styles.submitBtn}
                  type="submit"
                  onSubmit={onSubmit}
                >{`${initialPlayer.id ? 'Edit' : 'Add'} Player `}</button>
                <button className={styles.cancelBtn} onClick={onCancel}>
                  Cancel{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlayer;
