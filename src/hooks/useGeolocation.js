import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Aquí podrías hacer una llamada a una API de geocodificación
        // Por ahora, retornamos null y dejamos que el usuario seleccione
        setEstado(null);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }, []);

  return { estado, loading, error, setEstado };
};
