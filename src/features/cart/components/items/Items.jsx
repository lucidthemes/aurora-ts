import useItems from '../../hooks/items/useItems';
import Item from './Item';

export default function Items({ items, updateCartItem, removeCartItem }) {
  const attributeMap = useItems(items);

  return (
    <ul className="flex flex-col gap-y-10" aria-label="Cart items">
      {items.map((item) => {
        const itemId = item.variation?.id ? item.productId + '-' + item.variation?.id : item.productId;
        return <Item key={itemId} item={item} attributeMap={attributeMap} updateCartItem={updateCartItem} removeCartItem={removeCartItem} />;
      })}
    </ul>
  );
}
