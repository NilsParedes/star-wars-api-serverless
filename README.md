# STAR WARS API

## Uso en entorno local

### Requisitos previos

- Node.js
- Mysql (local o en la nube)
- Serverless Framework
- AWS cli (configurar con sus credenciales)

### Configuración de Mysql

1. Instalar Mysql localmente o configurar una instancia en la nube.

### Instalación

1. Clona el repositorio de GitHub:

   ```bash
   git clone https://github.com/NilsParedes/star-wars-api-serverless.git
   ```

2. Navega al directorio del proyecto:

    ```bash
    cd star-wars-api-serverless
    ```

3. Instala las dependencias del proyecto:

    ```bash
    npm i
    ```

### Configuración del entorno

1. Crea un archivo .env en la raíz del proyecto y establezca la variable de entorno de mysql, ejemplo:.

      ```plaintext
         MYSQL_HOST=localhost
         MYSQL_PORT=3306
         MYSQL_USER=root
         MYSQL_PASSWORD=password
         MYSQL_DATABASE=star_wars
      ```

2. Ejecutamos el siguiente script para crear la BD y la tabla de characters:

```sql
      CREATE DATABASE IF NOT EXISTS star_wars;
      
      USE star_wars;
      
      CREATE TABLE IF NOT EXISTS characters (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          height VARCHAR(50) NOT NULL,
          mass VARCHAR(50) NOT NULL,
          hair_color VARCHAR(50) NOT NULL,
          skin_color VARCHAR(50) NOT NULL,
          eye_color VARCHAR(50) NOT NULL,
          birth_year VARCHAR(50) NOT NULL,
          gender VARCHAR(50) NOT NULL,
          created DATETIME DEFAULT CURRENT_TIMESTAMP,
          edited DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) AUTO_INCREMENT = 88;
```

### Ejecución de tests

1. Establecemos la conexión a la base de datos de prueba en el archivo jest.setup.ts.
   ```bash
      process.env.MYSQL_HOST='localhost'
      process.env.MYSQL_PORT='3306'
      process.env.MYSQL_USER='root'
      process.env.MYSQL_PASSWORD='password'
      process.env.MYSQL_DATABASE='star_wars'
    ```
2. Ejecutamos los tests.
   ```bash
    npx jest
    ```

### Ejecución del proyecto

1. Ejecuta el proyecto localmente

    ```bash
    serverless offline
    ```

2. Acceder al proyecto:
    ```bash
    http://localhost:3000
    ```


3. Acceder a la documentación swagger:
    ```bash
    http://localhost:3000/docs
    ```

## Probar herramienta

La herramienta consta de 2 funciones.

1. Crear un nuevo recurso

```bash
curl --location 'http://localhost:3000/api/characters' \
--header 'Content-Type: application/json' \
--data '{
  "nombre": "Luke Skywalker",
  "altura": "1.72",
  "masa": "77",
  "color_cabello": "rubio",
  "color_piel": "clara",
  "color_ojos": "azul",
  "anio_nacimiento": "1998",
  "genero": "male"
}'
```

Ejemplo de respuesta:

```json
{
  "data": {
    "id": 33,
    "nombre": "Luke Skywalker",
    "altura": "1.72",
    "masa": "77",
    "color_de_cabello": "rubio",
    "color_de_piel": "clara",
    "color_de_ojos": "azul",
    "ano_de_nacimiento": "1998",
    "genero": "male"
  }
}
```

2. Obtener un recurso

```bash
curl --location 'http://localhost:3000/api/characters/1'
```

Ejemplo de respuesta:

```json
{
  "data": {
    "nombre": "Luke Skywalker",
    "altura": "172",
    "masa": "77",
    "color_cabello": "blond",
    "color_piel": "fair",
    "color_ojos": "blue",
    "anio_nacimiento": "19BBY",
    "genero": "male"
  }
}
```

### Despliegue del proyecto en AWS

1. Despliega el proyecto en AWS.
    ```bash
    serverless deploy
    ```

2. Accede a la aplicación utilizando la URL proporcionada por AWS.