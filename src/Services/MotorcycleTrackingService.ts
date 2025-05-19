// MotorcycleTrackingService.ts (ejemplo)

const API_URL = "http://localhost:5000";

export const startTrackingByPlate = async (plate: string) => {
  const res = await fetch(`${API_URL}/motorcycles/track/${plate}`, {
    method: "POST",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al iniciar tracking: ${errorText}`);
  }
  return await res.json();
};

export const stopTrackingByPlate = async (plate: string) => {
  const res = await fetch(`${API_URL}/motorcycles/stop/${plate}`, {
    method: "POST",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al detener tracking: ${errorText}`);
  }
  return await res.json();
};
