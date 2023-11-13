const Total = ({ parts }) => {
  return (
    <p>
      {`Total of ${parts.reduce((total, current) => {
        return current.exercises + total;
      }, 0)} Exercises`}
    </p>
  );
};

export default Total;
