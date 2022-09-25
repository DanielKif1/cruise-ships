const Itinerary = require('../itinerary');
const ship = require('../port');
const port = require('../port');

let dover;
let calais;
let itinerary;

describe("itinerary",() =>{
  test("The object of an itinerary", () =>{

    expect(new Itinerary()).toBeInstanceOf(Object);
  });
  test("can have ports", () =>{
      dover = jest.fn();
      calais = jest.fn();

      itinerary = new Itinerary([dover,calais]);
      expect(itinerary.ports).toEqual([dover,calais]);
  });

});


