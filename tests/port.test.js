const Port = require('../port');
const ship = require('../ship');
const itinerary = require('..//itinerary');

let port;
const shipp = jest.fn();

describe('Constructor of Port',() => {
    test('Has a port object', () => {

   expect(new Port()).toBeInstanceOf(Object);
    });

    test('CurrentPort has a property',() =>{

        port = new Port("Dover");
        expect(port.name).toEqual("Dover");
    })
});

describe("addShip", () => {
    test("When it docks at port,the proporty ships it added ship",() =>{
        port = {
            removeShip: jest.fn(),
            addShip:jest.fn()
        };
        skegness = {
            port,
            name: "Skegness",
            shiips: []
        };
        port.addShip(shipp);

        expect(port.addShip).toHaveBeenCalledWith(shipp);
    } );
});

describe("removeShip", () =>{
    test("removes ship from ships propoerty", () =>{
        port = new Port("Dover");

        port.addShip(shipp);
        port.removeShip(shipp);

        expect(port.ships).toEqual([]);
    });
});