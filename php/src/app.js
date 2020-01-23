$(document).ready(function() {
    // uso le handlebars per creare la struttura dei rettangoli

    var source = $("#rectangle-template").html();
    var template = Handlebars.compile(source);

    // Chiamo ajax per creare il contenuto della pagina
    // utilizzo l'api prendere i dati delle canzoni
    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function(data) {
            // l'API restituisce un array di oggetti perciò uso la dot notation per recuperare i dati effettivi
            // specifico l'array:
            var dischi = data.response;
            // uso il ciclo per prendere tutti i dati effettivi
            for (var i = 0; i < dischi.length; i++) {
                //prendo il dato all'interno dell'oggetto, definisco una variabile per prendere l'oggeto_corrente[i]
                var disco_corrente = dischi[i];
                //gli metto la dot notation per prendere i dati interni di ciascun reparto:
                var copertina = disco_corrente.poster;
                var titolo = disco_corrente.title;
                var autore = disco_corrente.author;
                var anno = disco_corrente.year;
                var genere = disco_corrente.genre;

                // creo il context per le handlebars e ci metto i dati presi prima tramite l'API

                var context = {
                    coverImg: copertina,
                    songTitle: titolo,
                    author: autore,
                    year: anno,
                    genre: genere
                };
                // vado ad inserire il context nel template appendendolo
                var html = template(context);
                $('#contenitoreDischi').append(html);

            }
        },
        'error': function() {
            alert('ERRORE');
        }
    });
    // Uso change per intercettare il click e scambiare correttamente le varie opzioni
    //
    $('#scegliGenere').change(function() {
        // Prendo il contenuto di option, cioè i vari generi musicali
        var genere_selezionato = $('#scegliGenere').val();
        // se il valore della variabile è vuoto allora mostra tutte le opzioni

        if (genere_selezionato == '') {
            $('.rectangle').fadeIn();
        } else {
            //con faOut nascondo tutti i rettangoli in modo da visualizzarli succesivamente a seconda della richiesta
            $('.rectangle').fadeOut();

            //uso each per controllare se ogni rettangolo corrisponde all'optione che ho selezionato
            $('.rectangle').each(function() {
                //Controllo se il valore (selezionato) corrisponde a quello dell'API
                //Creo una variabile per confrontare i valori:
                var genere_rectangle = $(this).attr('data-genere');
                if (genere_rectangle.toLowerCase() == genere_selezionato.toLowerCase()) {
                    // per ogni rectangle mi confronto e vado a fare fadeIn.
                    $(this).fadeIn();
                }
            })
        }
    })









})
