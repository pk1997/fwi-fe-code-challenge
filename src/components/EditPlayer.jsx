import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddPlayer from './AddPlayer';
import Image from 'next/image';

export default function EditPlayer({ initialPlayer }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        data-testid={`edit-${initialPlayer.id}`}
      >
        <Image
          src="https://img.icons8.com/ios-glyphs/60/000000/edit--v1.png"
          alt="Delete"
          width={30}
          height={30}
        />
      </div>
      {isOpen && (
        <AddPlayer setIsOpen={setIsOpen} initialPlayer={initialPlayer} />
      )}
    </>
  );
}
