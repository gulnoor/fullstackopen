import backendServices from "../hooks/backendServices";

const Person = ({ person, setPersons, setMessage }) => {
  const id = person.id;
  const handleDelete = () => {
    backendServices
      .deletePerson(id)
      .then(() => {
        setPersons((prev) => {
          return prev.filter((person) => person.id !== id);
        });
        setMessage({
          message: `${person.name} deleted successfully`,
          type: "success",
        });
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        setMessage({ message: `${error}`, type: "error" });
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };
  return (
    <>
      <p>{`${person.name} ${person.number}`}</p>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

const Persons = ({ persons, query, setPersons, setMessage }) => {
  return (
    <>
      {persons
        .filter((person) => {
          return person.name
            ? person.name.toLowerCase().includes(query.toLowerCase())
            : true;
        })
        .map((person) => {
          return (
            <Person
              setMessage={setMessage}
              setPersons={setPersons}
              person={person}
              key={person.id}
            />
          );
        })}
    </>
  );
};

export default Persons;
