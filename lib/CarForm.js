//react comp will handle the user input

import { json } from "stream/consumers"

//and make a request to the api route

//we will intercept the submit event bypassing
//a function to the form to handle submit

const handleSubmit = async (event) =>{
    //will first call event prevent default to 
    //prevent the page from refreshing on submit
    event.preventDefault()
    //normally to convert the form event to json 
//you have to access each individual property which leads to 
//some ugly code a better approach is to convert the event target(html)
//to the form data class which is built into the browser
//THAT will organize the for m fields into key value pairs
//and then we can convert that to json by using object from entries

const form =new FormData(event.target) //
const formData = Object.fromEntries(form.entries()) //to convert form data to object
//now we make a request to the api by using fetch api in the browser

const res = await fetch('/api/cars',{
    body:JSON.stringify(formData), //we pass form data to the body
    headers:{
        'Content-Type':'application/json', //we set the content type to json
    },
    method:'POST' //we set the method to post
})
const result = await res.json()
//and then we can do something with the result
//like redirecting to the new car page
//or displaying a success message
//or displaying an error message
console.log(result)

}





export default function CarForm(){
    return(

        <form onSubmit={handleSubmit}>
            {/* here the name should match redis schema */}
            <input name="make" type="text" />
            <input name="make" type="text" />
            <input name="make" type="text" />
            <textarea name="description" type="text" />
            <button type ="submit">create Car</button>
        </form>
    )
}



