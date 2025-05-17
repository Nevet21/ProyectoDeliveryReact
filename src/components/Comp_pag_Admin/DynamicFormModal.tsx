import React from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";

type FieldOption = {
  label: string;
  value: any;
};

type Field = {
  key: string;
  label: string;
  type: "text" | "number" | "email" | "select";
  required?: boolean;
  options?: FieldOption[]; // Opciones para selects
};

type Props<T> = {
  open: boolean;
  title: string;
  fields: Field[];
  data?: Partial<T>;
  onClose: () => void;
  onSubmit: (values: T) => void;
};

export function DynamicFormModal<T>({
  open,
  title,
  fields,
  data = {},
  onClose,
  onSubmit,
}: Props<T>) {
  const [formValues, setFormValues] = React.useState<Partial<T>>(data);

  React.useEffect(() => {
    setFormValues(data);
  }, [data]);

  if (!open) return null;

  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues as T);
  };

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar (esquina superior derecha) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  required={field.required}
                  value={(formValues as any)[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option value="">Selecciona una opción</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  required={field.required}
                  value={(formValues as any)[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 transition cursor-pointer"
            onClick={onClose}
          >
            <X size={16} />
            Cancelar
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
            onClick={handleSubmit}
          >
            <Save size={16} />
            Guardar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

