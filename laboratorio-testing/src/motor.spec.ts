import { getState, cardNumber, cardValue } from './motor';
import { States } from './modelo';

describe('getState', () => {
  it('El jugador llega a 7.5 y gana la partida', () => {
    //Arrange
    const score: number = 7.5;
    const expected: States = 'SEVEN_AND_A_HALF';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('El jugador se pasa de 7.5 y pierde la partida', () => {
    //Arrange
    const score: number = 8;
    const expected: States = 'GAME_OVER';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('El jugador se planta con un numero menor que 4', () => {
    //Arrange
    const score: number = 3.5;
    const expected: States = 'LESS_THAN_FOUR';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('El jugador se planta con un numero entre 4 y 6', () => {
    //Arrange
    const score: number = 5;
    const expected: States = 'BETWEEN_FOUR_AND_SIX';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('El jugador se planta con un numero entre 6 y 7', () => {
    //Arrange
    const score: number = 6.5;
    const expected: States = 'BETWEEN_SIX_AND_SEVEN';

    //Act
    const result = getState(score);

    //Asssert
    expect(result).toBe(expected);
  });
});

describe('cardNumber', () => {
  it('El número es mayor que siete y se le suma 2', () => {
    //Arrange
    const number = 8;
    const esperado = number + 2;
    //Act
    const result = cardNumber(number);
    //Assert
    expect(result).toBe(esperado);
  });
  it('El número es manor o igual que siete y no se le suma nada', () => {
    //Arrange
    const number = 6;
    const esperado = number;
    //Act
    const result = cardNumber(number);
    //Assert
    expect(result).toBe(esperado);
  });
});
describe('cardValue', () => {
  it('El valor de la carta al ser mayor de 7, es 0.5', () => {
    //Arrange
    const number = 10;
    const esperado = 0.5;
    //Act
    const result = cardValue(number);
    //Assert
    expect(result).toBe(esperado);
  });
  it('El valor de la carta al ser manor de 7, su numero es su valor', () => {
    //Arrange
    const number = 7;
    const esperado = number;
    //Act
    const result = cardValue(number);
    //Assert
    expect(result).toBe(esperado);
  });
});
