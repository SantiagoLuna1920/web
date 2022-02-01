//Creamos nuestro patron modulo para evitar fallas de seguridad

( (  ) => {

        "use strict"; // se debe usar este argumento para que asi nuestro codigo javascript pueda leer el codigo y analizarlo sin errores de inicializaciones de variables.
        // const array1 = [4, 5, 7, 3, 7];

        // const largeNumber = ( element, element2 ) => element > element2;

        // console.log( array1.findIndex( largeNumber ) );

        const resultados = document.querySelector("#resultados");
    const small = document.querySelectorAll("small");
    const divCartas = document.querySelector("#jugador-cartas");
    const cartasComputador = document.querySelector("#computador-cartas");
    const newGame = document.querySelector("#bynNuevo");
    const btnDetener = document.querySelector("#bynDetener");
    let deck = [  ];
    let puntosCarta=0;
    let puntosComputador=0;
    const btnPedir = document.querySelector("#bynPedir");

    //Esta funcion crea una nueva baraja al querem epezar el juego nuevamente
    const createDeck = (  ) => {
        //creamos nuestras constantes fijas deckNumbers, deckSpecials y deckCharacters, estas no van a mutar ni a cambiar, por lo que son valores de cartas fijas
        //Creamos nuestra variable deck, serà un let porque esta va a cambiar con respecto a las barajas
        const deckNumbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        const deckSpecials = [ "A", "J", "K", "Q" ];
        const deckCharacters = [ "C", "D", "H", "S" ];
        //Creamos nuestros for of para crear la primer pareja de cartas que son los valores con numeros
        for ( const deckNumber of deckNumbers ) {
            for ( const deckCharacter of deckCharacters ) {
                deck.push( `${deckNumber}${deckCharacter}` );
            }
        }
        //creamos nuestro otro for of para crear las barajas especiales
        for ( const deckSpecial of deckSpecials ) {
            for ( const deckCharacter of deckCharacters ) {
                deck.push( `${deckSpecial}${deckCharacter}` );
            }
        }
        
        
        //le asignamos al arreglo deck una funcion llamada shuffle de la libreria underscore.js para que este nos entregue el arreglo desordenado y no en orden
        deck = _.shuffle( deck );
        
        console.log( deck );
        return deck;
    }

    //Funcion para tomar una carta de la baraja al azar

    const deckTake = (  ) => {
        
        if ( deck.length>=1 ) {
            // let deckRandom = _.sample( deck );
            let deckRandom = deck.pop(  );
            // let deckPosition = deck.indexOf( deckRandom );
            // deck.splice( deckPosition, 1 );
            return deckRandom;
        } else {
            throw "Ya no hay cartas en el deck";
        }
        
        
    }


    //Funcion para darle valor a las cartas
    const deckValue = ( carta ) => {
        let value = carta;
        value = value.substring( 0, value.length - 1);
        if ( value === "A" ) {
            return 11;
        } else if ( !isNaN(value*1) ) {
            return value*1;
        } else {
            return 10;
        }
    }

    const turnoComputadora = ( puntosJugadorMinimo ) => {
        do {
            const cartaComputador = document.createElement("img");
        const carta = deckTake(  );
        puntosComputador = puntosComputador + deckValue( carta );
        small[1].innerHTML = puntosComputador;
        cartaComputador.src = `/assets/cartas/${ carta }.png`;
        cartaComputador.classList.add("carta");
        cartasComputador.append( cartaComputador );
        } while ( ( puntosComputador < puntosJugadorMinimo ) && ( puntosJugadorMinimo <= 21 ) );

        return puntosComputador;
    }

    btnPedir.addEventListener( 'click', () => {
        const cartaJugador = document.createElement("img");
        const carta = deckTake(  );
        // const puntosCarta;
        puntosCarta = puntosCarta + deckValue( carta );
        small[0].innerHTML = puntosCarta;
        cartaJugador.src = `/assets/cartas/${ carta }.png`; 
        cartaJugador.classList.add("carta");
        divCartas.append( cartaJugador );
        // <img class="carta" src="/assets/cartas/10S.png" alt=""></img>


        if ( puntosCarta > 21 ) {
            turnoComputadora( puntosCarta );
            resultados.innerText = "Perdiste";
            btnDetener.disabled = true;
            btnPedir.disabled = true; //el .disabled = true; sirve para desabilitar el evento cuando lo deseemos
        } else if ( puntosCarta === 21 )  {
            turnoComputadora( puntosCarta );
            if ( puntosCarta === puntosComputador ) {
                resultados.innerText = "Empate";
                btnDetener.disabled = true;
            btnPedir.disabled = true;
            } else {
                turnoComputadora( puntosCarta );
                resultados.innerText = "Ganaste";
                btnDetener.disabled = true;
            btnPedir.disabled = true;
            }
        }

    });


    btnDetener.addEventListener("click", () => {
        const valueC = turnoComputadora( puntosCarta );
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        if ( (valueC > puntosCarta ) && (valueC <22) ) {
            resultados.innerText = "Perdiste";
        }else if ( (valueC > puntosCarta ) && (valueC >= 22) ) {
            resultados.innerText = "Ganaste";
        } else {
            resultados.innerText = "Empate";
        }

        console.log( valueC );

    })

    newGame.addEventListener( 'click', () => {
        deck = [  ];
        createDeck(  );
        puntosCarta=0;
        puntosComputador=0;
        small[0].innerText = "0";
        small[1].innerText = "0";
        btnPedir.disabled = false;
        btnDetener.disabled = false;

        divCartas.innerHTML = "";
        cartasComputador.innerHTML = "";
        resultados.innerText = "Resultados";           
    } );

    createDeck(  );
    // deckValue( deckTake(  ) );

})(  );