async function postRequest(url,body){
    return fetch(url,{
        method:'POST',
        body:JSON.stringify(body),
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
         "Content-Type": "application/json",
        },
    })
}
export default postRequest