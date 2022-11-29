
export default function CarForm(){

    // a state to represent the state
    //or the results to get back from the search engine
  const[hits,setHits] = useState([])

  const search = async (event)=>
    {
        //first we will grab the first value of the form 
        //and format it as a url parametre
        const q = event.target.value
//the api route is expecting it in that format
//to pass the value along to redis
        if (q.length < 3) {
//to prevent the api from being called too many times
//also a good idea to debounce this code cuz itwill make an api call for every 
//key stroke and thats more api calls than we need

            const params = new URLSearchParams({q})
//fetch api o search endpoint along with the params
            const res = await fetch(`/api/search?${params}`)
//the result will be an array of cars
const result = await res.json()
console.log(result)
//we will set the hits state to the result
setHits(result['cars']) 

        }


    }
    return(
        <div>
            <input onChange={search}  type='text'/>
            <ul>
                {/* to map the cars */}
                {hits.map((hit) => (
                    <li key={hit.entityId}>
                            <a>{hit.make}</a>
                            <a>{hit.model}</a>

                       
                    </li>
                ))}
            </ul>


        </div>
    )
}


