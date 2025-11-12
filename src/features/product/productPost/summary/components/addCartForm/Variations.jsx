import useVariations from '../../hooks/addCartForm/useVariations';
import Select from '@components/Form/Select';

export default function Variations({ singleProduct, addCartFormData, setAddCartFormData }) {
  const { productVariations, handleProductVariationChange } = useVariations(singleProduct, addCartFormData, setAddCartFormData);

  return (
    <>
      {productVariations.length > 0 &&
        productVariations.map((variation, index) => {
          let variationOptions = [];
          variation.options.map((option) => variationOptions.push({ value: option.id, text: option.name }));
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
