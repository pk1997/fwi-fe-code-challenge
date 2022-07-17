import Header from './Header';
import PlayerTable from './pagination';

export default function App() {
  return (
    <>
      <Header />
      <PlayerTable itemsPerPage={20} />
    </>
  );
}
