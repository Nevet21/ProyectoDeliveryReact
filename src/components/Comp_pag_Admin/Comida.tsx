import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';

interface Props {
  data: any;
  isEdit: boolean;
  onSuccess: () => void;
}

const Comida: React.FC<Props> = ({ data, isEdit, onSuccess }) => {
const [form, setForm] = useState<{
  name: string;
  description: string;
  price: number | string;
  category: string;
}>(data || { name: '', description: '', price: '', category: '' });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/products/${data.id}`, form);
      } else {
        await axiosInstance.post('/products', form);
      }
      onSuccess();
    } catch (e) {
      console.error('Error al guardar comida', e);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Editar Comida' : 'Agregar Comida'}</h2>
      {Object.keys(form).map((key) => (
        <div key={key} className="mb-2">
          <label className="block capitalize">{key}</label>
          <input
            className="w-full border px-2 py-1 rounded"
            value={form[key as keyof typeof form] ?? ''}
onChange={(e) => handleChange(key, e.target.value)}

          />
        </div>
      ))}
      <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </div>
  );
};

export default Comida;
