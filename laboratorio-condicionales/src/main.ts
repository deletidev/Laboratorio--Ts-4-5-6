import './style.css';

interface PuntosPartida {
  MIN_SCORE: number;
  SEIS_COPAS: number;
  SIETE_COPAS: number;
  MAX_TOTAL_SCORE: number;
}

type States =
  | 'LESS_THAN_FOUR'
  | 'BETWEEN_FOUR_AND_SIX'
  | 'BETWEEN_SIX_AND_SEVEN'
  | 'SEVEN_AND_A_HALF'
  | 'GAME_OVER'
  | 'IMPOSIBLE';

const puntosPartida: PuntosPartida = {
  MIN_SCORE: 4,
  SEIS_COPAS: 6,
  SIETE_COPAS: 7,
  MAX_TOTAL_SCORE: 7.5
};

//Arrancamos
let scoreValue: number = 0;
let state: States = 'LESS_THAN_FOUR';
let message: string = '';

//Numero aleatorio
const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

// numero mayor que 7
const cardNumber = (number: number) => {
  return number > puntosPartida.SIETE_COPAS ? number + 2 : number;
};

//Mostrar valor del contador
const showScore = (scoreNumber: number): void => {
  const score = document.getElementById('score');
  score && score instanceof HTMLElement
    ? (score.innerHTML = scoreNumber.toString())
    : console.error('showScore: no ha encontrado el elemento con id score');
};

//CartaUrl
const urlCard = (num: number): string => {
  let urlName: string = '';
  switch (num) {
    case 1:
      urlName = '1_as-copas.jpg ';
      break;
    case 2:
      urlName = '2_dos-copas.jpg ';
      break;
    case 3:
      urlName = '3_tres-copas.jpg ';
      break;
    case 4:
      urlName = '4_cuatro-copas.jpg ';
      break;
    case 5:
      urlName = '5_cinco-copas.jpg ';
      break;
    case 6:
      urlName = '6_seis-copas.jpg ';
      break;
    case 7:
      urlName = '7_siete-copas.jpg ';
      break;
    case 10:
      urlName = '10_sota-copas.jpg ';
      break;
    case 11:
      urlName = '11_caballo-copas.jpg ';
      break;
    case 12:
      urlName = '12_rey-copas.jpg ';
      break;
    default:
      break;
  }

  let url: string = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${urlName}`;
  return url;
};

// Valor de la carta para la puntuación
const cardValue = (newNumber: number): number =>
  newNumber > puntosPartida.SIETE_COPAS ? 0.5 : newNumber;

// Cambio el estado del objeto partida
const setState = (newState: States): States => (state = newState);

// Cambio el mensaje del objeto partida
const setMessage = (newMessage: string): string => (message = newMessage);

// Cambio el scorVlue del objeto partida
const setScore = (newScore: number): number => (scoreValue = newScore);

//Actualizo la url de la img de la transición
const urlTransitionCard = (img: string): void => {
  const imgCard = document.getElementById('card-new');

  imgCard && imgCard instanceof HTMLImageElement
    ? (imgCard.src = img)
    : console.error('No se ha encontrado la imagen con id card-new');
};

//Devuelvo el stado del mensaje
const getState = (numero: number): States => {
  if (numero < puntosPartida.MIN_SCORE) {
    return 'LESS_THAN_FOUR';
  }
  if (numero >= puntosPartida.MIN_SCORE && numero < puntosPartida.SEIS_COPAS) {
    return 'BETWEEN_FOUR_AND_SIX';
  }
  if (
    numero >= puntosPartida.SEIS_COPAS &&
    numero <= puntosPartida.SIETE_COPAS
  ) {
    return 'BETWEEN_SIX_AND_SEVEN';
  }
  if (numero === puntosPartida.MAX_TOTAL_SCORE) {
    return 'SEVEN_AND_A_HALF';
  }
  if (numero > puntosPartida.MAX_TOTAL_SCORE) {
    return 'GAME_OVER';
  }
  return 'IMPOSIBLE';
};

// genero el mensaje
const generateMessage = (state: States): string => {
  let mensaje: string = '';

  switch (state) {
    case 'LESS_THAN_FOUR':
      mensaje = 'Has sido muy conservador';
      break;
    case 'BETWEEN_FOUR_AND_SIX':
      mensaje = 'Te ha entrado el canguelo eh?';
      break;
    case 'BETWEEN_SIX_AND_SEVEN':
      mensaje = 'Casi casí...';
      break;
    case 'SEVEN_AND_A_HALF':
      mensaje = '¡Lo has clavado! ¡Enhorabuena!🎉🎉';
      break;
    case 'GAME_OVER':
      mensaje = 'Te has pasado.</br> Game Over';
      break;
    case 'IMPOSIBLE':
      mensaje = `¿No hay numero?`;
      break;
    default:
      mensaje = `No sé cómo has llegado aquí`;
      break;
  }

  return mensaje;
};

//Actualizo el mensaje
const solutionMessage = (menssage: string): void => {
  const solution = document.getElementById('solution');

  solution && solution instanceof HTMLElement
    ? (solution.innerHTML = menssage)
    : console.error('showMessage: no encuentra el elemento con id solution');
};

// muestraMensajeDeComprobacion
const showMessage = (): void => {
  const solution = document.getElementById('solution');

  solution && solution instanceof HTMLElement
    ? solution.classList.add('display__solution--show')
    : console.error('showMessage: no encuentra el elemento con id solution');
};

//apagar boton
const btnDisabled = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? (btn.disabled = true)
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//encender boton
const btnEnabled = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? (btn.disabled = false)
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//mostrar Boton
const btnShow = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? btn.classList.remove('btn--hiden')
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//Ocultar Boton
const btnHiden = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? btn.classList.add('btn--hiden')
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//Botones para final partida
const checkHandBtns = () => {
  btnShow('new-game');
  btnHiden('add-card');
  btnHiden('stand');
};

//Miro si lleva 7.5 o si se ha pasado
const checkHand = (num: number): void => {
  if (
    num === puntosPartida.MAX_TOTAL_SCORE ||
    num > puntosPartida.MAX_TOTAL_SCORE
  ) {
    setState(getState(scoreValue));
    setMessage(generateMessage(state));
    solutionMessage(message);
    showMessage();
    checkHandBtns();
  }
};

//Crear la transición
const transitionAdd = (): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.classList.add('card__transition--move')
    : console.error('No se encuentra el elemento con id card-transition');
};

//eliminar la transición
const transitionReset = (): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.classList.remove('card__transition--move')
    : console.error('No se encuentra el elemento con id card-transition');
};

//Actualizo url de la carta de abajo
const urlTableCard = (img: string): void => {
  const imgCardRes = document.getElementById('card-prev');

  imgCardRes && imgCardRes instanceof HTMLImageElement
    ? (imgCardRes.src = img)
    : console.error('No se encuentra el elemento con id card-new o card-prev');
};

//mostrar carta de abajo
const showTableCard = (): void => {
  const imgCardRes = document.getElementById('card-prev');

  imgCardRes && imgCardRes instanceof HTMLImageElement
    ? imgCardRes.classList.remove('card--opacity')
    : console.error('No se encuentra el elemento con id card-new o card-prev');
};

const transitionEndBtns = () => {
  btnEnabled('add-card');
  btnEnabled('new-game');
};

// Termina la transición
const transitionEnd = (img: string): void => {
  //reseteo la transición
  transitionReset();

  //Actualizo url de la carta de abajo
  urlTableCard(img);

  //Muestro la carta nueva, la carta de abajo
  showTableCard();

  //Habilito botones
  transitionEndBtns();
};

//Creo evento transitionEnd
const transitionEvent = (img: string): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.addEventListener('transitionend', () =>
        transitionEnd(img)
      )
    : console.error('No se encuentra el elemento con id card-transition');
};

//oculto el mensaje
const solutionHide = (): void => {
  const solution = document.getElementById('solution');
  solution && solution instanceof HTMLElement
    ? solution.classList.remove('display__solution--show')
    : console.error('No se ha encontrado el elemento con id solution');
};

//Ocultar img
const imgHide = (): void => {
  const imgCardRes = document.getElementById('card-prev');
  imgCardRes && imgCardRes instanceof HTMLElement
    ? imgCardRes.classList.add('card--opacity')
    : console.error('No se ha encontrado el elemento con id card-prev');
};

const transitionBtns = () => {
  btnDisabled('add-card');
  btnDisabled('new-game');
};

//Dar carta
const giveMeCard = (): void => {
  // creo numero random;
  let newNumber: number = cardNumber(randomNumber(1, 10));

  //recibo mi URL de la img de la carta
  let img = urlCard(newNumber);

  //Veo la carta
  urlTransitionCard(img);

  //Hago la transición
  transitionAdd();

  //deshabilito botones durante la transición
  transitionBtns();

  //Le doy valor a la carta
  const newValue = cardValue(newNumber);

  //Actualizo puntuación
  setScore(scoreValue + newValue);

  //mostrar puntos
  showScore(scoreValue);

  //compruebo la mano
  checkHand(scoreValue);

  //compruebo que termina la transición para poder interactuar
  transitionEvent(img);
};

const newGameBtns = () => {
  btnHiden('new-game');
  btnHiden('next-move');
  btnShow('add-card');
  btnShow('stand');
  btnEnabled('next-move');
};

const stateBtns = () => {
  btnShow('new-game');
  btnShow('next-move');
  btnHiden('add-card');
  btnHiden('stand');
};

// Me planto
const stand = (): void => {
  setState(getState(scoreValue));
  setMessage(generateMessage(state));
  solutionMessage(message);
  showMessage();
  stateBtns();
};

//Nueva partida
const newGame = (): void => {
  //Botones inicio partida
  newGameBtns();

  //reseteo objeto partida
  setScore(0);
  setState(getState(scoreValue));
  setMessage(generateMessage(state));

  //muestro nueva puntuación
  showScore(scoreValue);
  //Oculto el mensaje
  solutionHide();

  //limpio el mensaje
  solutionMessage('');

  //Oculto la img
  imgHide();

  //Reseteo las url de las img
  urlTransitionCard('');
  urlTableCard('');
};

const initBtns = () => {
  const addCard = document.getElementById('add-card');
  const standBtn = document.getElementById('stand');
  const newGameBtn = document.getElementById('new-game');
  const nextMoveBtn = document.getElementById('next-move');

  if (addCard && addCard instanceof HTMLButtonElement) {
    addCard.addEventListener('click', giveMeCard);
  }

  if (standBtn && standBtn instanceof HTMLButtonElement) {
    standBtn.addEventListener('click', stand);
  }

  if (newGameBtn && newGameBtn instanceof HTMLButtonElement) {
    newGameBtn.addEventListener('click', newGame);
  }

  if (nextMoveBtn && nextMoveBtn instanceof HTMLButtonElement) {
    nextMoveBtn.addEventListener('click', () => {
      giveMeCard();

      //Sólo permito ver un movimiento más
      btnDisabled('next-move');
    });
  }
};

const initGame = () => {
  //Pongo el 0
  showScore(scoreValue);

  //Me aseguro de que estén los botones
  initBtns();
};

document.addEventListener('DOMContentLoaded', initGame);
