# 🎮 API Piedra, Papel o Tijera - Backend

API RESTful creada con Node.js, Express, TypeScript y Firebase para el juego multijugador de Piedra, Papel o Tijera.

## 🚀 URL del servidor

**https://juego-backend-5uex.onrender.com**

## ✅ Características

- Crear salas de juego con códigos únicos de 6 caracteres
- Sistema de jugadores listos (ambos deben confirmar para iniciar)
- Mejor de 3 partidas sincronizado
- Sistema de puntajes persistente
- Historial completo de partidas
- Base de datos en tiempo real con Firebase

## 🗂️ Estructura del Proyecto
```
.
├── src/
│   ├── index.ts              # Punto de entrada
│   ├── config/               # Configuración de Firebase
│   ├── types/                # Definiciones de TypeScript
│   ├── services/
│   │   └── gameService.ts    # Lógica de negocio
│   ├── controllers/
│   │   ├── gameController.ts # Controlador partidas
│   │   └── roomController.ts # Controlador salas
│   └── routes/
│       ├── gameRoutes.ts     # Rutas de partidas
│       └── roomRoutes.ts     # Rutas de salas
├── .env
├── package.json
└── tsconfig.json
```

## 📚 Endpoints

### Salas de Juego (Rooms)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/signup` | Crear sala y registrar jugador |
| POST | `/rooms/:roomId/join` | Unirse a una sala |
| POST | `/rooms/:roomId/ready` | Marcar jugador como listo |
| GET | `/rooms/:roomId/status` | Obtener estado de la sala |
| GET | `/rooms/:roomId` | Obtener sala y jugadas |
| POST | `/rooms/:roomId/play` | Guardar jugada |

### Ejemplos de uso

#### Crear sala
```json
POST /signup
{
  "name": "Juan"
}
// Respuesta:
{
  "roomId": "AB12CD",
  "playerId": "uuid-xxx"
}
```

#### Unirse a sala
```json
POST /rooms/AB12CD/join
{
  "name": "María"
}
// Respuesta:
{
  "playerId": "uuid-yyy"
}
```

#### Marcar como listo
```json
POST /rooms/AB12CD/ready
{
  "playerId": "uuid-xxx"
}
// Respuesta:
{
  "success": true
}
```

#### Estado de la sala
```json
GET /rooms/AB12CD/status
// Respuesta:
{
  "roomCode": "AB12CD",
  "players": [
    { "id": "uuid-xxx", "name": "Juan" },
    { "id": "uuid-yyy", "name": "María" }
  ],
  "isReady": true
}
```

### Partidas (Legacy)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/games/play` | Jugar una partida |
| GET | `/api/gamerooms/:id/scores` | Ver puntajes |
| GET | `/api/gamerooms/:id/history` | Ver historial |

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **Firebase Firestore** - Base de datos NoSQL
- **Render** - Deployment

## 📦 Instalación local
```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd juego-backend

# Instalar dependencias
npm install

# Configurar variables de entorno en .env
PORT=3000
FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com

# Agregar serviceAccountKey.json en la raíz

# Iniciar en modo desarrollo
npm run dev
```

## 🚀 Deployment en Render

1. Crea una cuenta en [Render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno:
   - `FIREBASE_DATABASE_URL`
4. Agrega tu `serviceAccountKey.json` como archivo secreto
5. Deploy automático con cada push a `main`

---

Desarrollado como proyecto educativo 🎓