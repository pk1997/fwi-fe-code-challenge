import styles from './Header.module.scss';
import { useState } from 'react';
import CloudColors from '../assets/cloud-color.svg';
import CloudEffects from '../assets/cloud-effects.svg';
import AddPlayer from './AddPlayer';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <header id="main-header" className={styles.header}>
      <div className={styles.logo}>
        <CloudColors className={styles.cloudColors} />
        <CloudEffects className={styles.cloudEffects} />
      </div>

      <h1 className={styles.title}>FWI Poker Challenge</h1>
      <div className={styles.addbutton} onClick={onClick}>
        Add Player
      </div>
      {isOpen && <AddPlayer setIsOpen={setIsOpen} />}
    </header>
  );
}

<button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
  Open Modal
</button>;
