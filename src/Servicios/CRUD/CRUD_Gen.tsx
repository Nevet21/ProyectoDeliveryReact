// Esta clase es genérica: recibe un tipo T que debe tener al menos una propiedad "id" numérica.
// Eso nos permite identificar y modificar/eliminar cada objeto.
export class CrudService<T extends { id: number }> {
  
    // Aquí guardamos los datos internamente en un arreglo.
    private data: T[] = [];
  
    // 🔹 GET: Devuelve todos los elementos guardados
    getAll(): T[] {
      return this.data;
    }
  
    // 🔹 ADD: Agrega un nuevo elemento al arreglo
    add(item: T): void {
      this.data.push(item);
    }
  
    // 🔹 UPDATE: Busca por ID y actualiza solo los campos que cambien
    update(id: number, updateData: Partial<T>): void {
      // Partial<T> significa que no hace falta pasar todos los campos, solo los que se quieren cambiar
      this.data = this.data.map(i =>
        i.id === id ? { ...i, ...updateData } : i
      );
    }
  
    // 🔹 DELETE: Elimina un elemento por ID
    delete(id: number): void {
      this.data = this.data.filter(i => i.id !== id);
    }
  
    // 🔹 DELETE ALL: Elimina todos los elementos (borra la lista entera)
    deleteAll(): void {
      this.data = [];
    }
  }
  