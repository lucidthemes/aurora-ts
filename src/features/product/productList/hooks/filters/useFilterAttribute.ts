import { useState, useEffect } from 'react';

import { getAttributesByType } from '@server/products/getAttributes';
import type { Attribute } from '@typings/products/attribute';

export default function useFilterAttribute(attributeType: 'colour' | 'size') {
  const [filterAttributes, setFilterAttributes] = useState<Attribute[]>([]);

  useEffect(() => {
    if (!attributeType) return;

    const fetchAttributes = async () => {
      try {
        const attributes = await getAttributesByType(attributeType);
        if (attributes) setFilterAttributes(attributes);
      } catch (error) {
        console.error('Failed to fetch attributes.', error);
      }
    };

    fetchAttributes();
  }, [attributeType]);

  return filterAttributes;
}
