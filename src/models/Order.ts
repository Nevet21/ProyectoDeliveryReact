
export interface Order {
  id?: number;                 // generado por backend
  customer_id: number;         // obligatorio
  menu_id: number;             // obligatorio
  motorcycle_id: number;       // obligatorio
  quantity: number;            // obligatorio
  total_price?: number;        // calculado por backend
  status?: string;             // opcional (default: pending)
}
