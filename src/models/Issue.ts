export interface Issue {
  id?: number;
  motorcycle_id: number;
  description: string;
  issue_type: string;
  date_reported?: string; // ISO string, opcional porque backend puede usar utcnow
  status?: string; // Por defecto 'open' en backend
}
