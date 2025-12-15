import { useHeaderLayoutContext } from '@contexts/HeaderLayoutContext';

import HeaderMainBlog from './Blog';
import HeaderMainMinimal from './Minimal';

interface HeaderMainProps {
  handleHeaderSearchActive: () => void;
}

export default function HeaderMain({ handleHeaderSearchActive }: HeaderMainProps) {
  const { headerMainLayout } = useHeaderLayoutContext();

  return (
    <div className="header-main bg-white">
      {headerMainLayout === 'blog' && <HeaderMainBlog />}
      {headerMainLayout === 'minimal' && <HeaderMainMinimal handleHeaderSearchActive={handleHeaderSearchActive} />}
    </div>
  );
}
