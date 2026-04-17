# NAVI URBAN

Landing + catalogo SSR con Astro, MongoDB Atlas, CMS privado y carga de imagenes con Cloudinary.

## Desarrollo local

1. Instala dependencias:
	 ```bash
	 npm install
	 ```
2. Crea tu archivo `.env` basado en `.env.example`.
3. Inicia el entorno local:
	 ```bash
	 npm run dev
	 ```

## Scripts

- `npm run dev`: servidor local
- `npm run build`: build de produccion
- `npm run preview`: preview local del build
- `npm run seed:atlas`: carga/actualiza datos iniciales en Atlas

## Despliegue en Vercel

Este proyecto usa `@astrojs/vercel/serverless` para SSR.

### 1) Importar repositorio en Vercel

- En Vercel, crea un proyecto desde tu repo.
- Framework: `Astro` (Vercel lo detecta automaticamente).
- Build command: `npm run build`.

### 2) Variables de entorno

Configura estas variables en Vercel (Project Settings > Environment Variables):

- `MONGODB_URI`
- `MONGODB_DB`
- `ADMIN_SESSION_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_DISPLAY_NAME`
- `CLOUDINARY_UPLOAD_FOLDER`

Cloudinary puede configurarse de cualquiera de estas formas:

- Opcion A:
	- `CLOUDINARY_CLOUD_NAME`
	- `CLOUDINARY_API_KEY`
	- `CLOUDINARY_API_SECRET`
- Opcion B:
	- `CLOUDINARY_URL` con formato:
		`cloudinary://<api_key>:<api_secret>@<cloud_name>`

### 3) Deploy

- Ejecuta deploy desde Vercel.
- Si usas seed inicial, ejecuta `npm run seed:atlas` apuntando al mismo `MONGODB_URI`/`MONGODB_DB` de produccion.

## Notas

- El CMS requiere login admin para CRUD y subida de imagenes.
- Las rutas publicas leen productos/promociones directamente desde MongoDB.
