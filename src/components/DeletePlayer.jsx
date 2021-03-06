import { deletePlayer as deletePlayerAction } from '../appState/players';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
export default function DeletePlayer({ playerId }) {
  const dispatch = useDispatch();

  const deletePlayer = (playerId) => {
    dispatch(deletePlayerAction(playerId)).unwrap();
    alert('Player Deleted');
  };
  return (
    <>
      {/* <p>Hello</p> */}
      <span
        onClick={() => deletePlayer(playerId)}
        style={{ cursor: 'pointer' }}
      >
        <Image
          src="https://img.icons8.com/ios-glyphs/60/000000/filled-trash.png"
          alt="Delete"
          width={30}
          height={30}
        />
      </span>
    </>
  );
}
