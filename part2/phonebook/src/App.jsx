import { useEffect, useState } from "react";
import Form from "./Components/Form";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import axios from "axios";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} setQuery={setQuery} />
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons query={query} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
