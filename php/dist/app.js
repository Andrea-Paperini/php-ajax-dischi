/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  // uso le handlebars per creare la struttura dei rettangoli
  var source = $("#rectangle-template").html();
  var template = Handlebars.compile(source); // Chiamo ajax per creare il contenuto della pagina
  // utilizzo l'api prendere i dati delle canzoni

  $.ajax({
    'url': 'https://flynn.boolean.careers/exercises/api/array/music',
    'method': 'GET',
    'success': function success(data) {
      // l'API restituisce un array di oggetti perciò uso la dot notation per recuperare i dati effettivi
      // specifico l'array:
      var dischi = data.response; // uso il ciclo per prendere tutti i dati effettivi

      for (var i = 0; i < dischi.length; i++) {
        //prendo il dato all'interno dell'oggetto, definisco una variabile per prendere l'oggeto_corrente[i]
        var disco_corrente = dischi[i]; //gli metto la dot notation per prendere i dati interni di ciascun reparto:

        var copertina = disco_corrente.poster;
        var titolo = disco_corrente.title;
        var autore = disco_corrente.author;
        var anno = disco_corrente.year;
        var genere = disco_corrente.genre; // creo il context per le handlebars e ci metto i dati presi prima tramite l'API

        var context = {
          coverImg: copertina,
          songTitle: titolo,
          author: autore,
          year: anno,
          genre: genere
        }; // vado ad inserire il context nel template appendendolo

        var html = template(context);
        $('#contenitoreDischi').append(html);
      }
    },
    'error': function error() {
      alert('ERRORE');
    }
  }); // Uso change per intercettare il click e scambiare correttamente le varie opzioni
  //

  $('#scegliGenere').change(function () {
    // Prendo il contenuto di option, cioè i vari generi musicali
    var genere_selezionato = $('#scegliGenere').val(); // se il valore della variabile è vuoto allora mostra tutte le opzioni

    if (genere_selezionato == '') {
      $('.rectangle').fadeIn();
    } else {
      //con faOut nascondo tutti i rettangoli in modo da visualizzarli succesivamente a seconda della richiesta
      $('.rectangle').fadeOut(); //uso each per controllare se ogni rettangolo corrisponde all'optione che ho selezionato

      $('.rectangle').each(function () {
        //Controllo se il valore (selezionato) corrisponde a quello dell'API
        //Creo una variabile per confrontare i valori:
        var genere_rectangle = $(this).attr('data-genere');

        if (genere_rectangle.toLowerCase() == genere_selezionato.toLowerCase()) {
          // per ogni rectangle mi confronto e vado a fare fadeIn.
          $(this).fadeIn();
        }
      });
    }
  });
});

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/app.js ./src/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Andre\Documents\Classe\my-app3\src\app.js */"./src/app.js");
module.exports = __webpack_require__(/*! C:\Users\Andre\Documents\Classe\my-app3\src\app.scss */"./src/app.scss");


/***/ })

/******/ });