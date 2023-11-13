import { useState } from "react";
import Form from "./Components/Form";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [query, setQuery] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} setQuery={setQuery} />
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons query={query} persons={persons} />
    </div>
  );
};

export default App;
