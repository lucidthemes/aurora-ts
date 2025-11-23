import NavLeftItems from '../NavLeftItems';

export default function NavLeft() {
  return (
    <nav className="lg:justify-self-end" aria-label="Header main left links">
      <ul className="flex flex-col gap-x-10 text-sm tracking-xwide uppercase lg:flex-row">
        <NavLeftItems />
      </ul>
    </nav>
  );
}
