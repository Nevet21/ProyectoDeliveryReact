export interface Driver {
  id?: number;
  name: string;
  license_number: string;
  phone: string;
  email: string;
  status?: string; // Por defecto 'available' en backend
}
