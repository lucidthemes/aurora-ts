import { Address } from './address';

export interface Customer {
  id: number;
  email: string;
  shipping?: Address;
  billing?: Address;
}
