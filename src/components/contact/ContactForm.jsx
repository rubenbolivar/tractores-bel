import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    estado: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear mensaje para WhatsApp
    const mensaje = `*Nuevo Contacto desde Web*\n\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nEstado: ${formData.estado}\n\nMensaje:\n${formData.mensaje}`;

    // Número de WhatsApp principal
    const whatsappUrl = `https://wa.me/584145041522?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Mostrar mensaje de enviado
    setEnviado(true);

    // Reset después de 3 segundos
    setTimeout(() => {
      setEnviado(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        estado: '',
        mensaje: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (enviado) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-gray-600">
          Te contactaremos pronto por WhatsApp
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bel-green-500"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bel-green-500"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bel-green-500"
            placeholder="0414-123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado *
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bel-green-500"
          >
            <option value="">Selecciona tu estado</option>
            <option value="Distrito Capital">Distrito Capital</option>
            <option value="Miranda">Miranda</option>
            <option value="Zulia">Zulia</option>
            <option value="Lara">Lara</option>
            <option value="Portuguesa">Portuguesa</option>
            <option value="Guárico">Guárico</option>
            <option value="Aragua">Aragua</option>
            <option value="Carabobo">Carabobo</option>
            <option value="Barinas">Barinas</option>
            <option value="Apure">Apure</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Mensaje *
        </label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bel-green-500"
          placeholder="Cuéntanos qué necesitas..."
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        <Send size={20} />
        Enviar Mensaje
      </Button>

      <p className="text-xs text-gray-500 text-center">
        * Campos obligatorios. Al enviar, abriremos WhatsApp para completar tu consulta.
      </p>
    </form>
  );
};
