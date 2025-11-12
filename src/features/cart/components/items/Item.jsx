import { Link } from 'react-router-dom';
import Variation from './Variation';
import Quantity from './Quantity';
import Remove from './Remove';

export default function Item({ item, attributeMap, updateCartItem, removeCartItem }) {
  if (!item) return null;

  return (
    <li className="flex gap-x-5 border-b-1 border-pearl-bush pb-10 last:border-b-0 last:pb-0">
      <div className="basis-[25%] sm:basis-[15%]">
        {item.image && (
          <Link to={`/product/${item.slug}`}>
            <img src={item.image} alt={item.title} className="rounded-sm" />
          </Link>
        )}
      </div>
      <div className="flex basis-[75%] flex-col gap-y-5 sm:basis-[85%]">
        <div className="flex flex-col gap-y-2.5 sm:flex-row sm:justify-between">
          {item.title && (
            <Link to={`/product/${item.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              <h3 className="text-2xl">{item.title}</h3>
            </Link>
          )}
          {item.price && <p className="text-xl text-shark">£{(item.quantity * item.price).toFixed(2)}</p>}
        </div>
        {item.price && item.quantity > 1 && <p>£{item.price.toFixed(2)}</p>}
        <Variation item={item} variation={item.variation} attributeMap={attributeMap} />
        {updateCartItem && (
          <Quantity productId={item.productId} productStock={item.stock} variation={item.variation} quantity={item.quantity} updateCartItem={updateCartItem} />
        )}
        {removeCartItem && <Remove productId={item.productId} variation={item.variation} removeCartItem={removeCartItem} />}
      </div>
    </li>
  );
}
