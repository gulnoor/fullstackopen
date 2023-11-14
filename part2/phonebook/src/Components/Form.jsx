import { useState } from "react";
import backendServices from "../hooks/backendServices";

const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleNameInput = (e) => {
    setNewName(() => e.target.value);
  };

  const handlePhoneInput = (e) => {
    setNewPhone(() => e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const exixtingPerson = persons.find((person) => person.name === newName);

    if (
      exixtingPerson &&
      window.confirm(`${newName} Already exists. Want to update the contact?`)
    ) {
      backendServices
        .updatePerson({ ...exixtingPerson, number: newPhone })
        .then((response) => {
          setPersons((prevState) =>
            prevState.map((p) =>
              p.name === exixtingPerson.name ? response.data : p
            )
          );
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => console.log(error));
    } else {
      backendServices
        .savePerson({ name: newName, number: newPhone })
        .then((response) => {
          setPersons((prev) => {
            return [...prev, response.data];
          });
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        Phone: <input value={newPhone} onChange={handlePhoneInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
