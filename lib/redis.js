import {Client, Entity, Schema, Repository} from 'redis-om'

const client = new Client()
//to connect with the cloud database

async function connect() {
    if(!client.isOpen()) {
        //this will open the connection if not already open
        await client.open(process.env.REDIS_URL)
    }
}

//here we create a car model
//we define an entity for the data (like a database table) 
class car extends Entity{}
//we can give it a schema that contains a varaiety of properties
let schema = new Schema(
    Car,
    {
        make:{type:'string'},
        model:{type:'string'},
        image:{type:'string'},
        description:{type:'string', textSearch:true}
    },
    {
        dataStructure:'JSON' //here redis will operate more like 
        //a document oriented database
        //a database and store the data as JSON
    }


)

//and now we are ready to start creating data

export async function createCar(data) {

    await connect() //firstly connect to the database client

    let repo = new Repository(Car, client) //create a repo by combining the schema and the client together

    const car = repo.createEntity(data) //to create new data later we'll get a form input in the ui

    const id = await repo.save(car) //to commit it to the database
//and redis will return an automatically generated unique id

    return car
}

//to query and show the cars on the frontend
//using redis search

export async function createIndex() {
    //to refrence the repo and call the create index
    //before we use it we go to our schema and enable the search
    //by setting the search property to true
    await connect()

    let repo = new Repository(Car, client)

    await repo.createIndex('make', 'model', 'year', 'color', 'price', 'mileage', 'description')
}


//function to search the cars
export async function searchCars(q) {
//takes a query as input which will be whatever the user types
//into the form

    await connect()

    let repo = new Repository(Car, client)

    const cars = await repo.search()
        .where('make').eq(q)
        .or('model').eq(q)
        .or('description').matches(q)
        .return.all()


    return cars
}




