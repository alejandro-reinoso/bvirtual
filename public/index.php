<?php
//Control de errores 1 habilitado 0 no habilitado
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use Aura\Router\RouterContainer;

$capsule = new Capsule;

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

// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();


$request = Zend\Diactoros\ServerRequestFactory::fromGlobals(
    $_SERVER,
    $_GET,
    $_POST,
    $_COOKIE,
    $_FILES
);

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


$matcher = $routerContainer->getMatcher();
$route = $matcher->match($request);
if(!$route){
    echo 'Ruta no encontrada';
}else{
    $handlerData= $route->handler;
    $controllerName = new $handlerData['controller'];
    $actionName = $handlerData['action'];

    $controller = new $controllerName;
    $controller->$actionName($request);
}

