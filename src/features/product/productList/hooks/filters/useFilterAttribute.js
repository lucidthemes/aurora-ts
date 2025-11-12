import { useState, useEffect } from 'react';
import { getAttributesByType } from '@server/products/getAttributes';

export default function useFilterAttribute(attributeType) {
  const [filterAttributes, setFilterAttributes] = useState([]);

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
