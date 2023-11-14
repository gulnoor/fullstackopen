import backendServices from "../hooks/backendServices";

const Person = ({ person, setPersons }) => {
  const id = person.id;
  const handleDelete = () => {
    backendServices
      .deletePerson(id)
      .then(() =>
        setPersons((prev) => {
          return prev.filter((person) => person.id !== id);
        })
      )
      .catch((err) => console.log(err));
  };
  return (
    <>
      <p>{`${person.name} ${person.number}`}</p>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

const Persons = ({ persons, query, setPersons }) => {
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
            <Person setPersons={setPersons} person={person} key={person.id} />
          );
        })}
    </>
  );
};

export default Persons;
