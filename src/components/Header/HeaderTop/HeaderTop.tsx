import Container from '@components/Layout/Container';
import { useHeaderLayoutContext } from '@contexts/HeaderLayoutContext';

import Nav from './Nav';
import Icons from '../Icons';

interface HeaderTopProps {
  handleHeaderSearchActive: () => void;
}

export default function HeaderTop({ handleHeaderSearchActive }: HeaderTopProps) {
  const { headerTopShown } = useHeaderLayoutContext();
  const headerTopClasses = !headerTopShown ? 'hidden' : '';

  return (
    <div className={`header-top bg-spring-wood py-3 lg:py-4 ${headerTopClasses}`}>
      <Container>
        <div className="flex justify-between">
          <Nav />
          <Icons location="top" handleHeaderSearchActive={handleHeaderSearchActive} />
        </div>
      </Container>
    </div>
  );
}
