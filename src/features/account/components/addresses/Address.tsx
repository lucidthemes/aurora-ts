import { Customer } from '@typings/shop/customer';

interface AddressProps {
  loggedInUser: Customer | null;
  section: 'shipping' | 'billing';
}

export default function Address({ loggedInUser, section }: AddressProps) {
  let country = '';

  if (loggedInUser && loggedInUser[section]?.country) {
    switch (loggedInUser[section].country) {
      case 'GB':
        country = 'United Kingdom';
        break;
    }
  }

  return (
    <>
      {loggedInUser && loggedInUser[section] ? (
        <address className="not-italic">
          <p>{loggedInUser[section]?.firstName + ' ' + loggedInUser[section]?.lastName}</p>
          <p>{loggedInUser[section]?.addressLine1}</p>
          <p>{loggedInUser[section]?.addressLine2}</p>
          <p>{loggedInUser[section]?.city}</p>
          <p>{loggedInUser[section]?.county}</p>
          <p>{loggedInUser[section]?.postcode}</p>
          {country && <p>{country}</p>}
          <p>{loggedInUser[section]?.phone}</p>
        </address>
      ) : (
        <p>You have not set up a {section} address yet</p>
      )}
    </>
  );
}
