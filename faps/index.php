<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <link rel="icon" href="favicon.ico">

        <title>FSinfo: Aktivitätspunkte</title>

        <link rel="stylesheet" href="assets/css/main.css" />
    </head>

    <body>

        <div class="container">
            <header>
                <img src="assets/img/logo_fsinfo_pathed_white.svg" id="logo" alt="FSinfo-Logo" />
            </header>

            <nav>
                <h1>FSinfo: Aktivitätspunkte</h1>
                <h3><?php echo "Hallo ".$_SERVER['AUTHENTICATE_GIVENNAME']."!"; ?></h3>
                <?php
                    echo "Dein aktueller Punktestand: ";
                    $token = crc32($_SERVER['AUTHENTICATE_UID']);
                    if (in_array($token, array(2736907408, 1667975509))) {
                        echo ($token % 213) + 1401;
                    } else {
                        echo ($token % 213) + 1;
                    }
                ?>
            </nav>
        </div> <!-- /container -->
    </body>
</html>
