import useHeader from './useHeader';
import HeaderTop from './HeaderTop';
import HeaderMain from './HeaderMain';
import Search from './Search';

interface HeaderProps {
  mobileMenuClasses: string;
}

export default function Header({ mobileMenuClasses }: HeaderProps) {
  const { headerSearchActive, handleHeaderSearchActive } = useHeader();

  return (
    <header className={`relative bg-white ${mobileMenuClasses} transition-[right] duration-300 ease-in-out`}>
      <HeaderTop handleHeaderSearchActive={handleHeaderSearchActive} />
      <HeaderMain handleHeaderSearchActive={handleHeaderSearchActive} />
      <Search headerSearchActive={headerSearchActive} handleHeaderSearchActive={handleHeaderSearchActive} />
    </header>
  );
}
