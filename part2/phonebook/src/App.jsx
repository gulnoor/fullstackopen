import { useEffect, useState } from "react";
import Form from "./Components/Form";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import axios from "axios";
import Notification from "./Components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {message.message && <Notification message={message} />}
      <Filter query={query} setQuery={setQuery} />
      <Form persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons
        setMessage={setMessage}
        query={query}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
