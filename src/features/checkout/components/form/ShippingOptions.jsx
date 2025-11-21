import useShippingOptions from '../../hooks/form/useShippingOptions';

export default function ShippingOptions({ billingSameShipping, shippingOption, setShippingOption }) {
  const { shippingOptions, handleShippingOptionChange } = useShippingOptions(shippingOption, setShippingOption);
  if (!Array.isArray(shippingOptions) || shippingOptions.length === 0) return null;

  const sectionNumber = billingSameShipping ? '3' : '4';

  return (
    <fieldset className="mb-10 flex flex-col gap-y-6">
      <legend className="sr-only">Shipping options</legend>
      <h2 className="text-3xl">{sectionNumber}. Shipping options</h2>
      <div className="relative pl-7.5 before:absolute before:left-0 before:left-2 before:h-full before:border-l-1 before:border-pearl-bush">
        <ul className="rounded-sm border-1 border-pearl-bush">
          {shippingOptions.map((shipping) => {
            const shippingSelectedClasses = shipping.id === shippingOption.id ? 'ring-1 ring-black rounded-sm' : '';
            const shippingRadioChecked = shipping.id === shippingOption.id;
            const shippingAmount = shipping.amount !== 0 ? shipping.amount : 'free';
            return (
              <li
                key={shipping.id}
                onClick={() => handleShippingOptionChange(shipping)}
                className={`flex cursor-pointer items-center gap-x-4 border-b-1 border-pearl-bush p-4 last:border-b-0 ${shippingSelectedClasses}`}
              >
                <div className="flex">
                  <input
                    type="radio"
                    className="h-6 w-6 cursor-pointer accent-black"
                    name="shipping"
                    checked={shippingRadioChecked}
                    onChange={() => handleShippingOptionChange(shipping)}
                  />
                </div>
                <dl className="flex w-full justify-between">
                  <dt className="text-xl text-shark">{shipping.name}</dt>
                  <dd className="text-xl text-shark capitalize">{shippingAmount}</dd>
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
}
