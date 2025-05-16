import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';

interface Props {
  data: any;
  isEdit: boolean;
  onSuccess: () => void;
}

const Pedido: React.FC<Props> = ({ data, isEdit, onSuccess }) => {
  const [form, setForm] = useState<{
  customer_id: string;
  menu_id: string;
  motorcycle_id: string;
  quantity: number;
  total_price: number;
  status: string;
}>(data || {
  customer_id: '',
  menu_id: '',
  motorcycle_id: '',
  quantity: 1,
  total_price: 0,
  status: ''
});


  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/orders/${data.id}`, form);
      } else {
        await axiosInstance.post('/orders', form);
      }
      onSuccess();
    } catch (e) {
      console.error('Error al guardar pedido', e);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Editar Pedido' : 'Agregar Pedido'}</h2>
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

export default Pedido;
