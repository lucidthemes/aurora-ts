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

    setProductVariations(filteredVariations);
  }, [attributeArray, selectedVariations]);

  const handleProductVariationChange = (e) => {
    const { name, value } = e.target;

    if (value === '' || value === null) {
      // remove the variation set to default from the selected variations object
      const updatedSelectedVariations = { ...selectedVariations };
      delete updatedSelectedVariations[name];
      setSelectedVariations(updatedSelectedVariations);
    } else {
      setSelectedVariations({
        ...selectedVariations,
        [name]: Number(value),
      });
    }
  };

  // check selected variations to get correct variation ID
  useEffect(() => {
    if (Object.keys(selectedVariations).length) {
      const variationAttributes = singleProduct.variationAttributes;

      // check the number of variation attributes for the product matches the number of selected variations
      if (variationAttributes?.length === Object.keys(selectedVariations).length) {
        let filteredVariation = [];

        variationAttributes.forEach((variation) => {
          variation.options.forEach((option) => {
            if (selectedVariations[variation.type] && selectedVariations[variation.type] === option) {
              const variationField = `${variation.type}Id`;
              if (filteredVariation.length === 0) {
                const filterVariation = singleProduct.variations.filter((variation) => variation[variationField] === option);
                if (filterVariation) filteredVariation = filterVariation;
              } else {
                const filterVariation = filteredVariation.filter((variation) => variation[variationField] === option);
                if (filterVariation) filteredVariation = filterVariation;
              }
            }
          });
        });

        if (filteredVariation.length === 1 && filteredVariation[0].id !== addCartFormData.variationId) {
          setAddCartFormData((prevData) => ({
            ...prevData,
            variationId: filteredVariation[0].id,
          }));
        }
      } else {
        setAddCartFormData((prevData) => ({
          ...prevData,
          variationId: '',
        }));
      }
    }
  }, [selectedVariations]);

  return { productVariations, handleProductVariationChange };
}
