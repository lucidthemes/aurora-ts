import { useCartContext } from '@features/cart/CartContext';
import { Link } from 'react-router-dom';
import SocialIcons from '@components/UI/SocialIcons';

export default function Icons({ location, handleHeaderSearchActive }) {
  const { cartItems } = useCartContext();

  const headerIconsClasses = location === 'top' ? 'flex w-full justify-between lg:w-auto' : 'hidden lg:hidden xl:flex';

  const headerCartAriaLabel = cartItems.length > 0 ? `Cart with ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}` : 'Cart';

  return (
    <div className={`${headerIconsClasses} gap-x-6 lg:justify-self-end`}>
      <SocialIcons />
      <ul className="flex items-center gap-x-6 lg:border-l-1 lg:border-boulder lg:pl-6">
        <li className="relative">
          <Link to="/cart" aria-label={headerCartAriaLabel} className="fill-boulder hover:fill-shark focus:fill-shark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-3.5transition-colors h-3.5 duration-300 ease-in-out">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
            {cartItems.length > 0 && (
              <div className="absolute -top-3 -right-3 flex h-4.5 w-4.5 justify-center rounded-full bg-shark text-white" aria-hidden="true">
                <span className="self-center">{cartItems.length}</span>
              </div>
            )}
          </Link>
        </li>
        <li>
          <button
            onClick={handleHeaderSearchActive}
            className="cursor-pointer fill-boulder transition-colors duration-300 ease-in-out hover:fill-shark"
            aria-label="Open search overlay"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3.5 w-3.5">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}
