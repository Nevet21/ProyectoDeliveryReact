import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ShiftService } from "../Services/ShiftService";
import { startTrackingByPlate, stopTrackingByPlate } from "../Services/MotorcycleTrackingService";
import L from "leaflet";

// Configurar íconos por defecto de Leaflet
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Icono personalizado para motos
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const BotonCentrar = ({ motos }: { motos: any[] }) => {
  const map = useMap();

  const centrarMapa = () => {
    const ubicaciones = motos
      .filter((m) => m.ubicacionHistorial && m.ubicacionHistorial.length > 0)
      .map((m) => {
        const historial = m.ubicacionHistorial;
        return L.latLng(historial[historial.length - 1][0], historial[historial.length - 1][1]);
      });

    if (ubicaciones.length === 0) {
      alert("No hay motos con ubicación para centrar");
      return;
    }

    if (ubicaciones.length === 1) {
      map.setView(ubicaciones[0], 15);
    } else {
      const bounds = L.latLngBounds(ubicaciones);
      map.fitBounds(bounds.pad(0.3));
    }
  };

  return (
    <button
      onClick={centrarMapa}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1000,
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: 5,
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Localizar Motos
    </button>
  );
};

const MapaPedidos = () => {
  const [motos, setMotos] = useState<any[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    ShiftService.getActive().then(async (activos) => {
      console.log("Datos recibidos de ShiftService:", activos);

      const motosConUbicacion = activos.map((moto) => ({
        ...moto,
        ubicacionHistorial: [],
      }));

      setMotos(motosConUbicacion);

      for (const shift of activos) {
        const plate = shift.motorcycle?.license_plate;
        if (plate) {
          await startTrackingByPlate(plate);
        }
      }
    });

    socketRef.current.on(
      "ubicacion_update",
      (data: { license_plate: string; lat: number; lng: number }) => {
        console.log("Ubicación recibida por WebSocket:", data);

        setMotos((prev) => {
          const index = prev.findIndex(
            (m) => m.motorcycle?.license_plate === data.license_plate
          );
          if (index === -1) return prev;

          const updated = [...prev];
          const moto = updated[index];

          const nuevoHistorial = moto.ubicacionHistorial
            ? [...moto.ubicacionHistorial]
            : [];
          nuevoHistorial.push([data.lat, data.lng]);

          updated[index] = {
            ...moto,
            ubicacionHistorial: nuevoHistorial,
          };
          return updated;
        });
      }
    );

    return () => {
      motos.forEach((moto) => {
        const plate = moto.motorcycle?.license_plate;
        if (plate) {
          stopTrackingByPlate(plate);
        }
      });

      socketRef.current?.disconnect();
    };
  }, []);

  // Botón adicional para detener el tracking manualmente
  const handleStopTracking = async () => {
    for (const moto of motos) {
      const plate = moto.motorcycle?.license_plate;
      if (plate) {
        try {
          await stopTrackingByPlate(plate);
          console.log(`Tracking detenido para: ${plate}`);
        } catch (err) {
          console.error(`Error al detener tracking para ${plate}:`, err);
        }
      }
    }
    alert("Tracking detenido para todas las motos.");
  };

  return (
    <div style={{ position: "relative", height: "80vh" }}>
      <MapContainer center={[4.71, -74.07]} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        <BotonCentrar motos={motos} />
        {motos.map((moto) =>
          moto.ubicacionHistorial && moto.ubicacionHistorial.length > 0 ? (
            <div key={moto.id}>
              <Marker
                position={moto.ubicacionHistorial[moto.ubicacionHistorial.length - 1]}
                icon={customIcon}
              >
                <Popup>{moto.motorcycle?.license_plate}</Popup>
              </Marker>
              <Polyline
                positions={moto.ubicacionHistorial}
                pathOptions={{ color: "blue", weight: 4 }}
              />
            </div>
          ) : null
        )}
      </MapContainer>

      {/* Botón de detener tracking */}
      <button
        onClick={handleStopTracking}
        style={{
          position: "absolute",
          top: 60,
          left: 10,
          zIndex: 1000,
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: 5,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Detener Tracking
      </button>
    </div>
  );
};

export default MapaPedidos;
