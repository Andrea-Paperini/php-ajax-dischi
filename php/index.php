<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/e42df28727.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
    <link rel="stylesheet" type="text/css" href="dist/app.css">
    <script src="dist/app.js" charset="utf-8"></script>
    <title>js-jq-ajax-musica</title>
</head>

<body>
    <header><i class="fab fa-spotify fa-5x"></i></header>


    <main>
        <!-- Costruisco la selezione del genere -->
        <select id="scegliGenere">
            <option value=""> Scegli un genere musicale</option>
            <option value="pop"> Pop </option>
            <option value="rock"> Rock </option>
            <option value="jazz"> Jazz </option>
            <option value="metal"> Metal </option>
        </select>
        <div id="contenitoreDischi"></div>
    </main>


    <script id="rectangle-template" type="text/x-handlebars-template">
        <div class="rectangle" data-genere="{{ genre }}">
                <img src="{{ coverImg }}"
                <p> {{ songTitle }} </p>
                <small>{{ author }}</small>
                <small>{{ year }}</small>
            </div>
        </script>
</body>

</html>
