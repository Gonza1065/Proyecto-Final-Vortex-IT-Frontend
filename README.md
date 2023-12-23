# Sistema de Turnos Médicos

Este proyecto es un sistema de gestión de turnos médicos que permite a los administradores agregar y administrar médicos, así como a los pacientes buscar y reservar turnos médicos.

## Funcionalidades

### Administradores

1. **Agregar Médico:** Los administradores pueden agregar nuevos médicos al sistema proporcionando su información.

2. **Actualizar Médico:** Los administradores pueden actualizar la información de un médico existente, incluyendo su nombre, apellido y especialidad.

3. **Crear Turno Disponible:** Los administradores pueden agregar turnos disponibles para que los pacientes reserven.

4. **Actualizar Turno Disponible:** Se puede actualizar la información de un turno disponible, como la fecha y la hora.

5. **Eliminar Turno Disponible:** Los administradores pueden eliminar un turno disponible del sistema.

6. **Listar Turnos por Médico:** Muestra todos los turnos disponibles para un médico específico.

7. **Listar Turnos por Paciente:** Muestra los turnos reservados y cancelados por un paciente.

8. **Historial de Cancelaciones por Paciente:** Muestra el historial de cancelaciones de turnos por parte de un paciente.

### Pacientes

1. **Ver Turnos Disponibles por Médico:** Los pacientes pueden ver todos los turnos disponibles para un médico en particular.

2. **Ver Especialidades Médicas:** Lista todas las especialidades médicas disponibles en el sistema.

3. **Reservar Turno:** Los pacientes pueden reservar turnos médicos disponibles.

4. **Cancelar Turno:** Los pacientes pueden cancelar los turnos reservados.

5. **Autenticación:** El sistema requiere autenticación para acceder a las funcionalidades. Los usuarios pueden registrarse como administradores o pacientes. También incluye un sistema de recuperación de contraseña.

## Uso

1. Clona el repositorio:

```bash
git clone https://github.com/Gonza1065/Proyecto-Final-Vortex-IT-Frontend
```

## Frontend

1. **Instala las dependencias:**

```bash
cd final-vortex-it
npm install
```

## Backend

1. Clona el repositorio del backend:

```bash
git clone https://github.com/Gonza1065/Proyecto-Final-Vortex-IT
```

2. **Ejecuta el servidor y la base de datos**

```bash
npm start
```

## Tecnologias Utilizadas

- Frontend: ReactJS
- Backend: Node.js, Express
- Base de Datos: MongoDB
- Autenticación: JSON Web Tokens (JWT)
- Encriptación de Contraseñas: Bcrypt.js
