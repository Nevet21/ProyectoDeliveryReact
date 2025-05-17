export interface Shift {
  id?: number;
  driver_id?: number;
  motorcycle_id?: number;
  start_time?: string;  // ISO string
  end_time?: string | null;  // ISO string o null
  status?: string;
}
