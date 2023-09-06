async function putRequest(url,body){
    return fetch(url,{
        method:'PUT',
        body:JSON.stringify(body),
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
         "Content-Type": "application/json",
        },
    })
}
export default putRequest