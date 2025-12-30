import type { Dispatch, SetStateAction } from 'react';

import Select from '@components/Form/Select';
import type { Product } from '@typings/products/product';
import type { AddCartFormData } from '@typings/products/summary';
import type { Attribute } from '@typings/products/attribute';

import useVariations from '../../hooks/addCartForm/useVariations';

interface VariationsProps {
  product: Product;
  setAddCartFormData: Dispatch<SetStateAction<AddCartFormData>>;
}

interface VariationOptions {
  value: number;
  text: string;
}

export default function Variations({ product, setAddCartFormData }: VariationsProps) {
  const { productVariations, handleProductVariationChange } = useVariations(product, setAddCartFormData);

  return (
    <>
      {productVariations.length > 0 &&
        productVariations.map((variation, index) => {
          let variationOptions: VariationOptions[] = [];
          variation.options.map((option: Attribute) => variationOptions.push({ value: option.id, text: option.name }));

          return (
            <div key={index} className="flex gap-x-5">
              <div className="basis-[20%] content-center">
                <span className="text-lg text-boulder capitalize">{variation.type}</span>
              </div>
              <div className="basis-[80%]">
                <Select
                  id={variation.type}
                  name={variation.type}
                  options={variationOptions}
                  onChange={handleProductVariationChange}
                  placeholder="Choose an option"
                  placeholderDisabled={false}
                  label={`Variation ${variation.type}`}
                  required={true}
                />
              </div>
            </div>
          );
        })}
    </>
  );
}
