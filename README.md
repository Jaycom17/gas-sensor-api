# Descripción
Api encargada del almacenamiento y las notificaciónes de las alertas emitidas por un dispositivo IoT que mide la calidad del aire en terminos de gases peligrosos y la temperatua.

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/Jaycom17/gas-sensor-api.git
```

### Ingresar al proyecto

```bash
cd gas-sensor-api
```

**Crear el archivo .env**, el archivo debe contener:

```env
PORT=#puerto donde va a correr el back
DATABASE_URL=#url para la base de datos apache jena fuseki
DATABASE_NAME=#nombre de la sabe de datos
DATABASE_USER=#usuario de la base de datos
DATABASE_PASSWORD=#contraseña de la base de datos
THINGSPEAK_URL=#url de donde se trae las medidas del sensor
THRESHOLDS_URL=#url de donde se traen los umbrales del sensor
AUDIENCE_ID=#id de la audiecia de resens (opcional)
TELEGRAM_BOT_TOKEN=#token del bot de telegram
EMAIL=#email para enviar los correos
EMAIL_PASSWORD=#contraseña de aplicación del correo
```
### Instalar dependencias

```bash
npm install
```

### Levantar la base de datos

Se puede editar el **docker-compose.yml** para cambiar la contraseña del usuario.

```bash
docker compose up -d
```

### Correr la api

```bash
npm run dev
```
