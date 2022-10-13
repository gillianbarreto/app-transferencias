export interface Transfer {
  contact_name: string;
  contact_rut: string;
  bank_name: string;
  account_type_name: string;
  account_number: string;
  message: string;
  amount: number;
}

export interface TransferRequest extends Transfer {
  user_id: number;
  contact_id: number;
}

export interface TransfersList extends Transfer {
  created_at: string;
}

export interface TransferSuccess extends Transfer {
  id: number | string;
  created_at: string;
  email: string;
}

