<?php

require_once __DIR__ . '/../includes/app.php';

use Controller\indexController;
use MVC\Router;

$router = new Router();

$router->get('/', [indexController::class , 'index'] );

$router->comprobarRutas();