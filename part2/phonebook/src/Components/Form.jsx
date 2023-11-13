import { useState } from "react";

const Form = ({persons,setPersons}) => {
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const handleInput = (e) => {
        setNewName(() => e.target.value);
      };

      const handlePhoneInput = (e) => {
        setNewPhone(() => e.target.value);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        persons.some((person) => person.name === newName)
          ? alert(`${newName} Already exists`)
          : setPersons((prev) => {
              return [...prev, { name: newName, number: newPhone }];
            });
        setNewName("");
        setNewPhone("");
      };
  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleInput} />
    </div>
    <div>
      Phone: <input value={newPhone} onChange={handlePhoneInput} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default Form