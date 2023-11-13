const Persons = ({ persons, query }) => {
  return (
    <>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        })
        .map((person) => {
          return <p key={person.name}>{`${person.name} ${person.number}`}</p>;
        })}
    </>
  );
};

export default Persons;
