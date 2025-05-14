export interface Personnel {
    // id?: number;         // Opcional
    personnel_id: string; // ID único del personal
     name: string;        // Nombre de la persona
     role: string;        // Rol: Piloto, Azafata, Técnico, etc.
     contact: string;     // Información de contacto (correo o teléfono)
     flightNumber?: string; // (Opcional) Número de vuelo asignado si aplica
   }