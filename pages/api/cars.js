//api route to handle the right operation
// on te backend

import { createCar } from "../../lib/redis";

//the every api route in next exports a default function named
//handler that contains the request and the response
//request is the incoming data
//response is the outgoing data you want to send it back to the client
export default async function handleer(req,res){
    //in this case we want to use the request body which will be json data
    // from the form to create new car
    const id = await createCar(req.body)

    //once redis is done writing that data
    //we can then send a response back to the client 
    //letting them know it was seccessful
    //with the new unique id

    res.status(200).json({id})

}


