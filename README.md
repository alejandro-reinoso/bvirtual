# Prueba BVirtual

_Esta es la aplicación web que me han solicitado en la prueba técnica de bvirtual, cuenta con un formulario para insertar usuarios o contactos según como los quieran denominar._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mirar **Instalación** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

_Para que el proyecto carge y corra perfectamente lo primero es contar con PHP7 y mysql instalado junto la BD, siempre se puede cambiar de base de datos si se requiere ya que este programa usa un ORM_

_Para poder cargar el proyecto completo necesitas tener composer_

_Además de lo anteriormente citado encontrará la base de datos en sql en el directorio raíz bvirtual-pruebale.sql_

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

_Descargar las librerías necesarias en vendor para esto usamos composer dentro de la carpeta_

```
composer install
```

_Ir al fichero index.php que se encuentra en la carpeta public y configurar los parametros de la base de datos según su configuración_

```
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'bvirtual-pruebale',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
```

_En este mismo archivo index los router están preparados para una carpeta local llamada bvirtual así que cambia esta por el nombre de carpeta que desees darle o si lo incluyes en directorio raíz o producción puedes quitar bvirtual_

```
$routerContainer = new RouterContainer();
$map = $routerContainer->getMap();
$map->get('index', '/bvirtual/',[
    'controller' => 'App\Controllers\ContactosController',
    'action' => 'indexContacto'
]);
$map->get('listado', '/bvirtual/listado',[
    'controller' => 'App\Controllers\ContactosController',
    'action' => 'listarContactos'
]);
$map->post('guardarContacto', '/bvirtual/guardarContacto',[
    'controller' => 'App\Controllers\ContactosController',
    'action' => 'guardarContacto'
]);
```

_Configurar los htacces, estos archivos git no me los permite subir así los escribo abajo tal cual indicando las rutas_

_Carpeta raíz .htaccess_

```
RewriteEngine On
RewriteCond %{THE_REQUEST} /public/([^\s?]*) [NC]
RewriteRule ^%1 [L,ne,r=301]
RewriteRule ^((?!public/).*)$ public/$1 [L,NC]
```

_Carpeta public .htaccess_

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [QSA,L]
```

_Carpeta assets .htaccess_

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ ../index.php [QSA,L]
```

## Construido con 🛠️

_Esta aplicación ha sido creada utilizando HTML, PHP, JS (Jquery) y se han implementado las siguientes librerías_

* [illuminate/database](https://packagist.org/packages/illuminate/database) - El ORM utilizado
* [zendframework/zend-diactoros](https://packagist.org/packages/zendframework/zend-diactoros) - Implementación de PSR HTTP Mensajes
* [aura/router](https://packagist.org/packages/aura/router) - Router con los requerimientos de PSR-7
* [twig/twig](https://packagist.org/packages/twig/twig) - Como template engine, para aportar seguridad y un códifo más limpio en la vista

## Autor ✒️

* **Alejandro Reinoso Gómez** - *Desarrollador full stack* - reinosogomezalejandro@gmail.com - 627 083 106



---
[Alejandro Reinoso](https://www.linkedin.com/in/alejandroreinosogomez/)
