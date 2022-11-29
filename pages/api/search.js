//api route for search

import { searchCars } from "../../lib/redis";

export default async function handler(req, res) {
    const cars = await searchCars(req.query.q)
    res.status(200).json({ cars })
}