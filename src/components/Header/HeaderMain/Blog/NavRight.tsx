import NavRightItems from '../NavRightItems';

export default function NavRight() {
  return (
    <nav className="lg:justify-self-start" aria-label="Header main right links">
      <ul className="flex flex-col gap-x-10 text-sm tracking-xwide uppercase lg:flex-row">
        <NavRightItems />
      </ul>
    </nav>
  );
}
