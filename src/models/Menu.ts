
import type { Product } from '../../src/models/Product';

export interface Menu {
  id: number;
  name: string;
  description: string;
  products: Product[];
}
