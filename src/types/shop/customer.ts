interface Address {
  firstName: string;
  lastName: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postcode: string;
  phone?: number;
}

export interface Customer {
  id: string;
  email: string;
  shipping?: Address;
  billing?: Address;
}
