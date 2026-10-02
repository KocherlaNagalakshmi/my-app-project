const API = "http://localhost:4000/api/tickets";
const request = async(URL, options = {}) => {
    const res = await fetch(URL, options);
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data?.error?.message || "Something went wrong");

    }
    return data;
}

export const getTickets = (params) => request (`${API}?${new URLSearchParams(params)}`);

export const createTicket = (data) => request(API, {
    method: "POST",
    headers : {"Content-Type" : "application/json"},
    body: JSON.stringify(data),
}) 


export const updateStatus = (id, status ) => request(`${API}/${id}`, {
    method : "PATCH",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({status}),

});