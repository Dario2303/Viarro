<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viarro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="build/css/styles.min.css">
</head>
<body class=<?php echo $titulo ?>>
    <header>
        <div class="header">
            <div class="cnt_logo">
                <img src="build/img/Viarro.svg" alt="viarro">
            </div>
            <div class="nav">
                <ul class="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Galeria</a></li>
                    <li><a href="#">nosotros</a></li>
                    <li><a href="#">blog</a></li>
                </ul>
            </div>
        </div>
    </header>

    <?php echo  $contenido; ?>
    
    <footer>footer</footer>
    <script src="build/js/bundle.min.js"></script>
</body>
</html>