# ecommerce-node-express-backend

### Requisitos previos:

- Docker instalado en su servidor conforme a los pasos 1 y 2 de [Cómo instalar y usar Docker en Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- Docker Compose instalado en su servidor conforme el paso 1 de [Cómo instalar Docker Compose en Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

### Version de docker usada
Docker version 20.10.10, build b485636

### Para crear el contenedor con Docker: 
```
docker-compose build
```
### Para levantar el contenedor: 
```
docker-compose up -d
```
### Para verificar el despliegue de los servicios: 
```
docker-compose ps
```

Output:

| NAME              |  COMMAND                 | SERVICE      | STATUS  | PORTS                  |
|-------------------|--------------------------|--------------|---------|------------------------|
| nodejs            | "docker-entrypoint.s…"   | node         | running | 0.0.0.0:3000->3000/tcp |
| postgresqlpostgis | "docker-entrypoint.s…"   | postgresqls  | running | 0.0.0.0:5433->5432/tcp |


### Si quiere limpiar las tablas de la base de datos, ejecutar en el cli dentro del contenedor nodejs:
```
npm run migrations:dev
```
