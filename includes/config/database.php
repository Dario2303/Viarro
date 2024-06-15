<?php

$db = mysqli_connect('localhost', 'root', 'root', 'viarro');


if (!$db) {
    echo "error: no se puede conectar a la base de datos";
    echo "errno de depuracion: ". mysqli_connect_errno();
    echo "error de depuracion: " . mysqli_connect_error();
}