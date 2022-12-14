const ships =  require('./ship');
const port = require('./port');
const itinerary = require('./itinerary');


let skegness;
let dover;
let holland;
let berlin;
let calais;

let itinerary;


let ship;

describe("Ship constructor", () => {
  beforeEach(() => {
    dover = new Port("Dover");
    itinerary = new Itinerary([dover]);
    ship = new Ship(itinerary);
  });

  it("returns an object", () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it("checks that it has a starting port property", () => {
    expect(ship.currentPort).toEqual(dover);
  });

  it("gets added to port on instantiation", () => {
    expect(dover.ships).toContain(ship);
  });
});

describe("setSail", () => {
  let port;
  beforeEach(() => {
    port = {
      removeShip: jest.fn(),
      addShip: jest.fn(),
    };

    skegness = {
      ...port,
      name: "Skegness",
      ships: [],
    };

    holland = {
      ...port,
      name: "Holland",
      ships: [],
    };

    berlin = {
      ...port,
      name: "Berlin",
      ships: [],
    };

    itinerary = {
      ports: [skegness, holland, berlin],
    };

    ship = new Ship(itinerary);
    port = jest.fn();
    ship.setSail();
  });

  it("tests if the ship has left the currentPort", () => {
    expect(ship.currentPort).toBeFalsy();
  });

  it("tests if the ship has been removed from the previous port's current port when it sets sail", () => {
    expect(skegness.removeShip).toHaveBeenCalledWith(ship);
  });

  it("sets the current port as the previous port once the ship has set sail", () => {
    expect(ship.previousPort).toEqual(itinerary.ports[0]);
  });

  it("can't sail further than its itinerary", () => {
    ship.dock();
    ship.setSail();
    ship.dock();

    expect(() => ship.setSail()).toThrowError("End of itinerary reached");
  });
});

describe("dock", () => {
  it("tests if ship can dock at different ports", () => {
    let port;
    port = {
      removeShip: jest.fn(), 
      addShip: jest.fn(), 
    };

    dover = {
      ...port,
      name: "Dover",
      ships: [],
    };

    calais = {
      ...port,
      name: "Calais",
      ships: [],
    };

    itinerary = {
      ports: [dover, calais],
    };

    ship = new Ship(itinerary);

    ship.setSail();
    ship.dock();

    expect(port.addShip).toHaveBeenCalledWith(ship);
  });

  it("tests if the ship is added to the ship's property of the port when it docks", () => {
    dover = new Port("Dover");
    calais = new Port("Calais");
    itinerary = new Itinerary([dover, calais]);
    ship = new Ship(itinerary);
    ship.setSail();
    ship.dock();

    expect(calais.ships).toContain(ship);
  });
});