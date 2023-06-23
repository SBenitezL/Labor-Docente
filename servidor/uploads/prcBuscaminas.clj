to go                                           ;;inicio del prodecimiento
  if game-over? [          ;; verifica que game-over sea verdadera, de ser asi eljuego terminó
    ask markers with [any? mines-here] [ die ] ;; si termina el juego, se deben desaparecer las marcas donde ha minas
    ask markers [ set color gray  - 2 ] ;;las casillas que no tengan minas se tornan de un gris mas oscuro
    ask mines [ show-turtle ] ;;las minas resstantes se harán visibles
    set game-over? true ;;se establece la var verdadera
    ask patches [ set pcolor red ];;los parches se coleran de rojo
    stop ;;no se ejecutaran mas instrucciones
  ]
  if not game-started? [  ;;si es falso, no ha comenzado el juego
    ;; this must be the first time through GO, so start the clock
    reset-timer ;;si se ejecuta go por primera vez se resetea el temporizador
    set game-started? true  ;;se establece verdadera para indicar que comenzo el juego
  ]
  set clock timer     ;;actualiza el tiempo de juego 
  if all? grass-squares [any? mines-here] [ ;;verifica que todas las casillas de hierba tiene minas (se gano)
    ;; you win!!!
    ask mines [ show-turtle ] ;;si gana muestra las minas con el show
    ask patches [ set pcolor blue ] ;; muestran los parches de color azul indicando que se gano
    stop   ;;no se ejecutaran mas lineas
  ]
  if mouse-down? [  ;; verifica si se ha hecho click
    ask patch (round mouse-xcor) (round mouse-ycor) [ ;;se selecciona el el parche 
      ifelse any? mines-here    ;;se verifica si el parche es una mina
        [ set game-over? true ]   ;; indiica que el juego ha terminado
        [ clear ]                 ;; se llama el prc clear
    ]
  ]
  tick    ;;se avanza un paso de tiempo para controlar la velocidad de animacion
end

to clear  ;; comienzo del clear muestra minas vecinas, vecinos sin minas para limpiarlos
  ask grass-squares-here [ die ]    ;;Se le ordena a todas las casillas de hierba desaparecer
  ask markers-here [ die ]
  let total count neighbors with [any? mines-here] ;;se le asigna a total el # de vecinos del parhe actual
  ifelse total > 0 ;;si es mayor a 0
    [ set plabel total ];;se muestra en el parche actual  el # de minas vecinas
    ;; if none of our neighbors have mines on them, then they can
    ;; be cleared too, to save the user from extra clicking
    [ ask neighbors with [any? grass-squares-here]  ;;evita que el jugador tenga que hacer clic en vecinos que no tengan minas
      [ clear ] ]
end