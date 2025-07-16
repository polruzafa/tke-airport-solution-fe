export async function fetchRooms() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Sala A",
          tasks: [
            {
              title: "Revisar equipo",
              estimatedDuration: 120000,
              startTime: "2025-07-15T08:30:00.000Z",
              endTime: "2025-07-15T08:32:00.000Z",
            },
            {
              title: "Preparar instrumental",
              estimatedDuration: 180000,
              startTime: "2025-07-15T08:35:00.000Z",
              endTime: null, // en progreso
            },
            {
              title: "Comprobar anestesia",
              estimatedDuration: 150000,
              startTime: null,
              endTime: null, // pendiente
            },
          ],
        },
        {
          id: 2,
          name: "Sala B",
          tasks: [
            {
              title: "Checklist preoperatorio",
              estimatedDuration: 200000,
              startTime: "2025-07-15T08:20:00.000Z",
              endTime: "2025-07-15T08:24:00.000Z",
            },
            {
              title: "Colocar monitorización",
              estimatedDuration: 240000,
              startTime: null,
              endTime: null,
            },
            {
              title: "Verificar identidad paciente",
              estimatedDuration: 180000,
              startTime: "2025-07-15T08:40:00.000Z",
              endTime: null, // en progreso
            },
          ],
        },
        {
          id: 3,
          name: "Sala C",
          tasks: [
            {
              title: "Registrar inicio de cirugía",
              estimatedDuration: 300000,
              startTime: null,
              endTime: null,
            },
            {
              title: "Control de constantes",
              estimatedDuration: 240000,
              startTime: "2025-07-15T08:10:00.000Z",
              endTime: "2025-07-15T08:14:00.000Z",
            },
            {
              title: "Anotar medicación administrada",
              estimatedDuration: 180000,
              startTime: null,
              endTime: null,
            },
          ],
        },
      ]);
    }, 500); // Simula 500ms de latencia
  });
}
