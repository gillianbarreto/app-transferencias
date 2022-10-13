export interface ContactRequest {
  user_id: number;
  fullname: string;
  alias?: string;
  rut: string;
  email: string;
  phone: string;
  bank_id: string;
  bank_name: string;
  account_type_id: number;
  account_number: string;
}

export interface Contact extends ContactRequest {
  contact_id: number;
  accounts_type: {
    name: string;
  }
}
