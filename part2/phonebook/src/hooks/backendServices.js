import axios from "axios"

const savePerson = (person)=>{
   return axios.post('http://localhost:3001/persons',person)
}
const updatePerson = (person)=>{
   return axios.put(`http://localhost:3001/persons/${person.id}`,person)
}

function deletePerson(id) {
    return axios.delete(`http://localhost:3001/persons/${id}`,id)
}

export default {savePerson,deletePerson,updatePerson}