export interface Photo {
  id?: number;
  issue_id?: number;
  image_url?: string; // URL o path en backend
  caption?: string;
  taken_at?: string; // fecha en formato ISO string
}
