export interface Service {
    id?: number;       // Opcional: id puede ser generado automáticamente
    name: string;      // Nombre del servicio
    description: string;  // Breve descripción de nuestro servicio
    location: string;   // Ubicación del servicio (ej. Aeropuerto, Ciudad)
  }