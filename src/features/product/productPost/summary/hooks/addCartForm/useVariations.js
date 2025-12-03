import { useState, useEffect } from 'react';
import { getAttributeArray } from '@server/products/getAttribute';

export default function useVariations(singleProduct, addCartFormData, setAddCartFormData) {
  const [productVariations, setProductVariations] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [attributeArray, setAttributeArray] = useState([]);

  // fetch product variation attributes and load into attributes array
  useEffect(() => {
    const variations = singleProduct.variationAttributes;

    if (!variations || !Array.isArray(variations)) return;

    const attributeIds = variations.flatMap((variation) => variation.options).filter(Boolean);

    const fetchAttributes = async () => {
      try {
        const attributes = await getAttributeArray(attributeIds);

        const formatted = variations.map((variation) => {
          const variationOptions = variation.options.map((optionId) => attributes.find((attr) => attr.id === optionId)).filter(Boolean);

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
  }, [singleProduct]);

  // filter variations based on selected variations
  useEffect(() => {
    if (!attributeArray) return;

    const filteredVariations = attributeArray.map((variationGroup) => {
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
            return singleProduct.variations.some((v) => v.sizeId === selectedVariations.size && v.colourId === optionId);
          }

          // no size selected, show all colours
          return true;
        }

        if (type === 'size') {
          if (selectedVariations.colour) {
            // get sizes that match with selected colour
            return singleProduct.variations.some((v) => v.colourId === selectedVariations.colour && v.sizeId === optionId);
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

    updateProductVariations(filteredVariations);
  }, [attributeArray, selectedVariations]);

  const handleProductVariationChange = (e) => {
    const { name, value } = e.target;

    const updatedSelectedVariations = { ...selectedVariations };

    if (value === '' || value === null) {
      delete updatedSelectedVariations[name];
    } else {
      updatedSelectedVariations[name] = Number(value);
    }

    setSelectedVariations(updatedSelectedVariations);

    const variationAttributes = singleProduct.variationAttributes;

    if (variationAttributes?.length === Object.keys(updatedSelectedVariations).length) {
      let filteredVariation = [];

      // product has colour and size variations
      if (updatedSelectedVariations.colour && updatedSelectedVariations.size) {
        const filteredColourSize = singleProduct.variations.filter(
          (variation) => variation.colourId === updatedSelectedVariations.colour && variation.sizeId === updatedSelectedVariations.size
        );
        if (filteredColourSize) filteredVariation = filteredColourSize;
      } else {
        // product has only colour variations
        if (updatedSelectedVariations.colour) {
          const filteredColour = singleProduct.variations.filter((variation) => variation.colourId === updatedSelectedVariations.colour);
          if (filteredColour) filteredVariation = filteredColour;
        }

        // product has only size variations
        if (updatedSelectedVariations.size) {
          const filteredSize = singleProduct.variations.filter((variation) => variation.sizeId === updatedSelectedVariations.size);
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
      setAddCartFormData((prevState) => ({
        ...prevState,
        variationId: '',
      }));
    }
  };

  return { productVariations, handleProductVariationChange };
}
