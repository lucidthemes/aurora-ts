import FooterInstagram from './FooterInstagram';
import FooterMain from './FooterMain';
import FooterBottom from './FooterBottom';

export default function Footer({ mobileMenuClasses }) {
  return (
    <footer className={`relative ${mobileMenuClasses} transition-[right] duration-300 ease-in-out`}>
      <FooterInstagram />
      <FooterMain />
      <FooterBottom />
    </footer>
  );
}
