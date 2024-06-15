<?php

namespace Controller;

use MVC\Router;

class indexController {
    public static function index(Router $router) {
        $router->render('index');
    }
}