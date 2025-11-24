import FooterInstagram from './FooterInstagram';
import FooterMain from './FooterMain';
import FooterBottom from './FooterBottom';

interface FooterProps {
  mobileMenuClasses: string;
}

export default function Footer({ mobileMenuClasses }: FooterProps) {
  return (
    <footer className={`relative ${mobileMenuClasses} transition-[right] duration-300 ease-in-out`}>
      <FooterInstagram />
      <FooterMain />
      <FooterBottom />
    </footer>
  );
}
