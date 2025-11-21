import NavLeftItems from '../NavLeftItems';
import NavRightItems from '../NavRightItems';

export default function Nav() {
  return (
    <nav className="justify-self-end">
      <ul className="flex flex-col gap-x-10 text-sm tracking-xwide uppercase lg:flex-row">
        <NavLeftItems />
        <NavRightItems />
      </ul>
    </nav>
  );
}
