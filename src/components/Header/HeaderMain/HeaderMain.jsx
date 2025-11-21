import { useHeaderLayoutContext } from '@contexts/HeaderLayoutContext';
import HeaderMainBlog from './Blog';
import HeaderMainMinimal from './Minimal';

export default function HeaderMain({ handleHeaderSearchActive }) {
  const { headerMainLayout } = useHeaderLayoutContext();

  return (
    <div className="header-main bg-white">
      {headerMainLayout === 'blog' && <HeaderMainBlog />}
      {headerMainLayout === 'minimal' && <HeaderMainMinimal handleHeaderSearchActive={handleHeaderSearchActive} />}
    </div>
  );
}
