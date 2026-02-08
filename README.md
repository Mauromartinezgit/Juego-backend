# API Piedra, Papel o Tijera

Este proyecto es una API RESTful creada con Node.js, Express, TypeScript y Firebase para un juego multijugador de Piedra, Papel o Tijera.

## Características

- ✅ Crear salas de juego (gamerooms)
- ✅ Jugar partidas de Piedra, Papel o Tijera
- ✅ Sistema de puntajes persistente
- ✅ Historial completo de partidas
- ✅ Base de datos en tiempo real con Firebase

## Estructura del Proyecto
```
.
├── src/
│   ├── index.ts          # Punto de entrada
│   ├── config/           # Configuración de Firebase
│   ├── types/            # Definiciones de TypeScript
│   ├── services/         # Lógica de negocio
│   ├── controllers/      # Controladores de rutas
│   └── routes/           # Definición de endpoints
├── .env                  # Variables de entorno
├── package.json
└── tsconfig.json
```

## Instalación

1. Clona el repositorio:
```bash
   git clone <URL_DEL_REPOSITORIO>
   cd juego-backend
```

2. Instala las dependencias:
```bash
   npm install
```

3. Configura las variables de entorno en `.env`:
```
   PORT=3000
   FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com
```

4. Agrega tu archivo `serviceAccountKey.json` en la raíz del proyecto.

5. Inicia el servidor:
```bash
   npm run dev
```

## 📚 Documentación de la API

La documentación completa de la API está disponible en Postman. Puedes importar la colección desde el archivo:

`API_Piedra_Papel_Tijera.postman_collection.json`

### Endpoints disponibles:

#### Gamerooms (Salas de Juego)

- **POST** `/api/gamerooms` - Crear una sala de juego
```json
  {
    "name": "Sala de prueba"
  }
```

- **GET** `/api/gamerooms` - Listar todas las salas

- **GET** `/api/gamerooms/:id` - Obtener sala por ID

- **GET** `/api/gamerooms/:id/scores` - Ver puntajes de una sala

- **GET** `/api/gamerooms/:id/history` - Ver historial de partidas

#### Games (Partidas)

- **POST** `/api/games/play` - Jugar una partida
```json
  {
    "roomId": "abc123",
    "player1Id": "player1",
    "player1Name": "Juan",
    "player1Choice": "piedra",
    "player2Id": "player2",
    "player2Name": "María",
    "player2Choice": "tijera"
  }
```

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **Firebase Firestore** - Base de datos NoSQL
- **dotenv** - Gestión de variables de entorno
- **cors** - Habilitación de CORS

## 🚀 Deploy en Render

El proyecto está desplegado en Render:

**Link: **Link:** https://juego-backend-5uex.onrender.com

### Cómo desplegar en Render:

1. Crea una cuenta en [Render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno:
   - `FIREBASE_DATABASE_URL`
4. Agrega tu `serviceAccountKey.json` como archivo secreto
5. Deploy automático con cada push a main