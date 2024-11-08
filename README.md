# Documentación para Ejecutar el Programa

Este programa incluye un frontend en React y un backend en Express, utilizando Bun como entorno de ejecución en lugar de npm. A continuación, se explica cómo configurar la base de datos, instalar Bun y ejecutar ambos entornos.

### Requisitos Previos
1. Node.js y Bun.
2. MySQL.
3. Git.

## 1. Configuración de la Base de Datos (MySQL)
Abre tu terminal o el cliente de MySQL y ejecuta los siguientes comandos para crear la base de datos mederi y sus tablas.

```sql
CREATE DATABASE mederi;

USE mederi;

CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'empleado') NOT NULL DEFAULT 'empleado',
    `email` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);

CREATE TABLE `MeetingRoom` (
    `id` CHAR(36) NOT NULL,
    `nameRoom` VARCHAR(100) NOT NULL,
    `capacity` INT NOT NULL,
    `availableResources` JSON,
    `location` VARCHAR(100) NOT NULL,
    `status` ENUM('disponible', 'no disponible') NOT NULL DEFAULT 'disponible',
    PRIMARY KEY(`id`),
    UNIQUE INDEX `nameRoom_UNIQUE` (`nameRoom` ASC) VISIBLE
);

CREATE TABLE `Reservation` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `meetingRoomId` CHAR(36) NOT NULL,
    `reservationDate` DATE NOT NULL,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `status` ENUM('activo', 'cancelado', 'completado') NOT NULL DEFAULT 'activo',
    PRIMARY KEY(`id`),
    CONSTRAINT `fk_user_Reservation` FOREIGN KEY(`userId`) REFERENCES User(`id`),
    CONSTRAINT `fk_meetingRoom_Reservation` FOREIGN KEY(`meetingRoomId`) REFERENCES MeetingRoom(`id`)
);

CREATE TABLE `Report` (
    `id` CHAR(36) NOT NULL,
    `meetingRoomId` CHAR(36) NOT NULL,
    `usageFrequency` INT,
    `totalHoursReserved` DECIMAL(5,2),
    PRIMARY KEY(`id`),
    CONSTRAINT `fk_meetingRoom_Report` FOREIGN KEY(`meetingRoomId`) REFERENCES MeetingRoom(`id`)   
);

CREATE TABLE `Notification` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `reservationId` CHAR(36) NOT NULL,
    `message` TEXT NOT NULL,
    `type` ENUM('creado', 'modificado', 'cancelado'),
    `sendAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    CONSTRAINT `fk_user_Notification` FOREIGN KEY(`userId`) REFERENCES User(`id`),
    CONSTRAINT `fk_reservationId_Notification` FOREIGN KEY(`reservationId`) REFERENCES Reservation(`id`)   
);
```

## 2. Instlación de Bun
Para ejecutar este proyecto, necesitas instalar Bun. Puedes hacerlo ejecutando el siguiente comando en la terminal:

```bash
curl -fsSL https://bun.sh/install | bash
```

Después de la instalación, asegúrate de que Bun esté disponible en tu ruta de sistema. Puedes verificar la instalación ejecutando:

```bash
bun --version
```

## 3. Configuración del Backend
Dirígete a la carpeta del backend y asegúrate de crear un archivo .env basado en el .env.example, configuralo correctamente con los datos de acceso a MySQL y el puerto para Express

```plaintext
# Express (Puerto)
PORT=3000

# MySql2 
MYSQL_HOST=localhost
MYSQL_USER={ Usuario } # Por defecto root
MYSQL_DB=mederi
MYSQL_PASSWORD={ Contraseña } # La de la base de datos

# JWT (Json Web Token)
SECRET_JWT_KEY=t{ Cualquier Cosa } # Tiene que ser largo
```

Instala las dependencias necesarias del backend utilizando Bun. Asegúrate de estar en la carpeta del backend y ejecuta:

```bash
bun install
```

Inicia el backend en modo desarrollo con el siguiente comando:

```bash
bun dev
```

Siguiendo todos los pasos se ejecutará el backend en http://localhost:3000.


## 4. Configuración del Frontend
Dirígete a la carpeta del frontend y asegúrate dde crear un archivo .env basado en el .env.example, configuralo correctamente para que apunte a la dirección del backend:

```plaintext
VITE_HOST='http://localhost:3000 # En caso de estar en el puerto 3000 '
```

Instala las dependencias del frontend con Bun. Asegúrate de estar en la carpeta del frontend y ejecuta:

```bash
bun install
```

Inicia el frontend en modo desarrollo con:

```bash
bun run dev
```

Esto ejecutará el frontend en http://localhost:5173 (o el puerto configurado por Vite).


## 5. Acceso y Prueba del Programa
- Accede al backend en http://localhost:3000.
- Accede al frontend en http://localhost:5173.

Asegúrate de que ambos servidores estén corriendo simultáneamente para que el frontend pueda comunicarse con el backend.