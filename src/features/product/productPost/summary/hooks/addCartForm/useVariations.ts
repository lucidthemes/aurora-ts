import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction, ChangeEventHandler } from 'react';

import { getAttributeArray } from '@server/products/getAttribute';
import type { Product } from '@typings/products/product';
import { AddCartFormData } from '@typings/products/summary';
import type { Attribute } from '@typings/products/attribute';
import type { Variation } from '@typings/cart/variation';

interface AttributeArray {
  type: string;
  options: Attribute[];
}

interface SelectedVariations {
  colour?: number;
  size?: number;
}

export default function useVariations(product: Product, setAddCartFormData: Dispatch<SetStateAction<AddCartFormData>>) {
  const [attributeArray, setAttributeArray] = useState<AttributeArray[]>([]);
  const [productVariations, setProductVariations] = useState<AttributeArray[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<SelectedVariations>({});

  // fetch product variation attributes and load into attributes array
  useEffect(() => {
    const variations = product.variationAttributes;

    if (!variations || !Array.isArray(variations)) return;

    const attributeIds = variations.flatMap((variation) => variation.options).filter(Boolean);

    const fetchAttributes = async () => {
      try {
        const attributes = await getAttributeArray(attributeIds);

        const formatted = variations.map((variation) => {
          const variationOptions = variation.options
            .map((optionId) => attributes.find((attr) => attr.id === optionId))
            .filter((attr): attr is Attribute => attr !== undefined);

          return {
            type: variation.type,
            options: variationOptions,
          };
        });

        setAttributeArray(formatted);
      } catch (error) {
        console.error('Failed to fetch attributes.', error);
      }
    };

    fetchAttributes();
  }, [product]);

  // filter variations based on selected variations
  useEffect(() => {
    if (!attributeArray) return;

    const filteredVariations: AttributeArray[] = attributeArray.map((variationGroup) => {
      const { type, options } = variationGroup;

      const filteredOptions = options.filter((option) => {
        const optionId = option.id;

        // no colour or size selected, show all variations
        if (!selectedVariations.size && !selectedVariations.colour) {
          return true;
        }

        if (type === 'colour') {
          if (selectedVariations.size) {
            // get colours that match with selected size
            return product.variations?.some((v) => v.sizeId === selectedVariations.size && v.colourId === optionId);
          }

          // no size selected, show all colours
          return true;
        }

        if (type === 'size') {
          if (selectedVariations.colour) {
            // get sizes that match with selected colour
            return product.variations?.some((v) => v.colourId === selectedVariations.colour && v.sizeId === optionId);
          }

          // no colour selected, show all sizes
          return true;
        }

        return true;
      });

      return {
        type,
        options: filteredOptions,
      };
    });

    const updateProductVariations = () => {
      setProductVariations(filteredVariations);
    };

    updateProductVariations();
  }, [attributeArray, selectedVariations]);

  const handleProductVariationChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;

    const updatedSelectedVariations = { ...selectedVariations };

    const key = name as keyof SelectedVariations;

    if (value === '' || value === null) {
      delete updatedSelectedVariations[key];
    } else {
      updatedSelectedVariations[key] = Number(value);
    }

    setSelectedVariations(updatedSelectedVariations);

    const variationAttributes = product.variationAttributes;

    if (variationAttributes?.length === Object.keys(updatedSelectedVariations).length) {
      let filteredVariation: Variation[] = [];

      // product has colour and size variations
      if (updatedSelectedVariations.colour && updatedSelectedVariations.size) {
        const filteredColourSize = product.variations?.filter(
          (variation) => variation.colourId === updatedSelectedVariations.colour && variation.sizeId === updatedSelectedVariations.size
        );
        if (filteredColourSize) filteredVariation = filteredColourSize;
      } else {
        // product has only colour variations
        if (updatedSelectedVariations.colour) {
          const filteredColour = product.variations?.filter((variation) => variation.colourId === updatedSelectedVariations.colour);
          if (filteredColour) filteredVariation = filteredColour;
        }

        // product has only size variations
        if (updatedSelectedVariations.size) {
          const filteredSize = product.variations?.filter((variation) => variation.sizeId === updatedSelectedVariations.size);
          if (filteredSize) filteredVariation = filteredSize;
        }
      }

      if (filteredVariation.length > 0) {
        setAddCartFormData((prevState) => ({
          ...prevState,
          variationId: filteredVariation[0].id,
        }));
      }
    } else {
      setAddCartFormData((prevState) => {
        delete prevState.variationId;
        const updatedData = { ...prevState };
        return updatedData;
      });
    }
  };

  return { productVariations, handleProductVariationChange };
}
