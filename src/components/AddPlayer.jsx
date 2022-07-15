import React, { useState } from 'react';
import styles from './modal.module.scss';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../appState/players';
import { COUNTRIES } from '../constants/countries';
import { isValidHttpUrl } from '../constants/helpers';
// import { NEW_PLAYER_SCHEMA } from '../server/controllers';

const AddPlayer = ({ setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: null,
    imageUrl: null,
    country: null,
    winnings: null,
  });
  const [error, setErrors] = useState({
    fields: [],
  });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      error.fields.length == 0 &&
      formData.name !== null &&
      formData.winnings !== null &&
      formData.country !== null
    ) {
      dispatch(addPlayer(formData)).unwrap();
      setIsOpen(false);
    }
  };
  const sortAndGetKeys = (COUNTRIES) => {
    return Object.keys(COUNTRIES).sort((a, b) => COUNTRIES[a] > COUNTRIES[b]);
  };
  const onValueChange = (e) => {
    console.log(e.target.id, e.target.value);
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
            <h5 className={styles.heading}>Add Player</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
          </button>
          <div className={styles.modalContent}>
            <form>
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                className={styles.inputText}
                id="name"
                name="name"
                placeholder="Player name.."
                required
                onChange={onValueChange}
                value={formData.name}
              />
              <label htmlFor="Image">Image URL</label>
              <input
                className={styles.inputText}
                id="image_url"
                name="image_url"
                placeholder="Image URL"
                required
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
              >
                {sortAndGetKeys(COUNTRIES).map((code) => (
                  <option key={code} value={code}>
                    {COUNTRIES[code]}
                  </option>
                ))}
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button
                    className={styles.submitBtn}
                    onClick={onSubmit}
                    disabled
                  >
                    Add Player
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setIsOpen(false)}
                    disabled
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlayer;
