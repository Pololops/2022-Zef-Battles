import './Header.scss';

interface Props {
  children: React.ReactElement
}

export default function Header({ children }: Props) {
  return (
    <header className="header">
      { children }
    </header>
  );
}       