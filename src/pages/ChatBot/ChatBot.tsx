import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// URL de tu backend local
const BACKEND_URL = 'http://127.0.0.1:5000';
// API Key y endpoint de Gemini (para preguntas generales)
const GEMINI_API_KEY = 'AIzaSyA0xh_EEyfuyOSDCYLakEHyf_BRBjXHiuw';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Claves de recursos a endpoints REST
const RESOURCES = {
  restaurantes: 'restaurants',
  productos: 'products',
  menus: 'menus',
  clientes: 'customers',
  pedidos: 'orders',
  direcciones: 'addresses',
  motos: 'motorcycles',
  conductores: 'drivers',
  turnos: 'shifts',
  incidencias: 'issues',
  fotos: 'photos',
};

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Bienvenido. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    addUser(text);

    const lower = text.toLowerCase();

    // Saludos
    if (/^(hola|buenos días|buenas tardes|buenas noches)/.test(lower)) {
      return addBot(
        '¡Hola! ¿Cómo estás? Por ejemplo, puedes pedirme:\n' +
        '• Ver productos disponibles\n' +
        '• Mostrar restaurantes\n' +
        '• Consultar menús del día\n' +
        '• Revisar tus pedidos\n' +
        '• Solicitar detalles de un producto o restaurante'
      );
    }
    // Cortesía
    if (lower.includes('gracias') || lower.includes('por favor')) {
      return addBot('Con gusto, estoy aquí para ayudarte.');
    }

    // Ayuda
    if (lower.includes('ayuda') || lower.includes('qué puedo') || lower.includes('ejemplos')) {
      return addBot(
        'Puedes probar preguntas como:\n' +
        '“¿Qué productos tienen?”\n' +
        '“Muéstrame los restaurantes”\n' +
        '“¿Qué menús hay hoy?”\n' +
        '“Ver mis pedidos recientes”\n' +
        'También puedes pedir “detalle de producto 2” o “detalle de restaurante 5”.'
      );
    }

    // Detalle de recurso
    const det = lower.match(/detalle(?:s)? (?:de|del) (\w+) (\d+)/);
    if (det) {
      const [_, key, id] = det;
      const endpoint = RESOURCES[key];
      if (endpoint) {
        return fetchDetail(endpoint, id);
      }
    }

    // Listar recurso
    const resourceKey = Object.keys(RESOURCES).find(r => lower.includes(r));
    if (resourceKey) {
      return fetchList(RESOURCES[resourceKey]);
    }

    // Fallback a Gemini
    addBot('Un momento, procesando tu solicitud...');
    try {
      const reply = await callGemini(text);
      addBot(reply);
    } catch {
      addBot('Lo siento, no pude procesar tu consulta.');
    }
  };

  const addUser = text => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
  };

  const addBot = text => {
    setMessages(prev => [...prev, { sender: 'bot', text }]);
  };

  const fetchList = async endpoint => {
    try {
      const res = await fetch(`${BACKEND_URL}/${endpoint}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : [data];
      const lines = items.map(item => {
        const name = item.name || item.nombre || 'Sin nombre';
        const price = item.price ?? item.precio;
        return price != null ? `• ${name} — $${price}` : `• ${name}`;
      });
      addBot(
        `Encontré ${items.length} ${endpoint} disponibles:\n` +
        `${lines.join('\n')}\n\n` +
        `Para más info, di “detalle de ${endpoint.replace(/s$/, '')} [id]”`
      );
    } catch {
      addBot('Error al cargar la lista. Por favor, inténtalo de nuevo.');
    }
  };

  const fetchDetail = async (endpoint, id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${endpoint}/${id}`);
      const item = await res.json();
      const parts = [];
      if (item.name || item.nombre) parts.push(`Nombre: ${item.name || item.nombre}`);
      if (item.price || item.precio) parts.push(`Precio: $${item.price ?? item.precio}`);
      if (item.description || item.descripcion) parts.push(`Descripción: ${item.description || item.descripcion}`);
      Object.entries(item).forEach(([k, v]) => {
        if (!['name','nombre','price','precio','description','descripcion'].includes(k)) {
          parts.push(`${k}: ${v}`);
        }
      });
      addBot(
        `Detalle de ${endpoint.replace(/s$/, '')} ${id}:\n` +
        `${parts.join('\n')}`
      );
    } catch {
      addBot('No pude obtener ese detalle.');
    }
  };

  const callGemini = async prompt => {
    const body = { contents: [{ parts: [{ text: `Usuario pregunta: ${prompt}` }] }] };
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return json.candidates?.[0]?.content?.parts?.join(' ') ||
      'Lo siento, no pude generar respuesta.';
  };

  return (
    <div className="flex flex-col max-w-md mx-auto border rounded-lg shadow-lg p-4 h-96">
      {/* Botón de navegación a Inicio */}
      <div className="mb-2">
        <Link to="/" className="text-blue-600 hover:underline">Volver al Inicio</Link>
      </div>
      <div className="flex-1 overflow-auto mb-4 whitespace-pre-wrap">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-1 p-2 rounded ${
              m.sender === 'user'
                ? 'bg-blue-100 self-end'
                : 'bg-gray-100 self-start'
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-3 focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Escribe tu pregunta..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          onClick={send}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
