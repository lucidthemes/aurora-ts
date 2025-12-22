import { useState, useEffect } from 'react';

import { getAttributeMap } from '@server/products/getAttribute';
import type { Item } from '@typings/cart/item';
import type { Attribute } from '@typings/products/attribute';

export default function useItems(items: Item[]) {
  const [attributeMap, setAttributeMap] = useState<Record<number, Attribute>>([]);

  useEffect(() => {
    if (!items) return;

    const fetchAttributeMap = async () => {
      try {
        const attributeIds = items.flatMap((item) => [item.variation?.colourId, item.variation?.sizeId]).filter(Boolean) as number[];

        const map = await getAttributeMap(attributeIds);
        if (map) setAttributeMap(map);
      } catch (error) {
        console.error('Failed to fetch attributes.', error);
      }
    };

    fetchAttributeMap();
  }, [items]);

  return attributeMap;
}
