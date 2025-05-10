// Address.tsx
export class Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  additional_info?: string; // opcional

  constructor(
    id: number,
    street: string,
    city: string,
    state: string,
    postal_code: string,
    additional_info?: string
  ) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.additional_info = additional_info;
  }
}
