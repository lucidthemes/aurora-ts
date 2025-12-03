import { useState, useEffect } from 'react';
import { getAttributeMap } from '@server/products/getAttribute';

export default function useItems(items) {
  const [attributeMap, setAttributeMap] = useState([]);

  useEffect(() => {
    if (!items) return;

    const fetchAttributeMap = async () => {
      try {
        const attributeIds = items.flatMap((item) => [item.variation?.colourId, item.variation?.sizeId]);

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
