import './Header.scss';

import Navbar from '../Navbar/Navbar';

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Zef's Battles</h1>
      <Navbar />
    </header>
  );
}       