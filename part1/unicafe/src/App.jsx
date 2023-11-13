import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  );
};
const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
const Statistics = (props) => {
  return (
    <>
      <table>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine
          text="Total"
          value={props.bad + props.good + props.neutral}
        />
        <StatisticLine
          text="Average"
          value={
            (-props.bad + props.good) / (props.good + props.bad + props.neutral)
          }
        />
        <StatisticLine
          text="Positive"
          value={(100 * props.good) / (props.bad + props.good + props.neutral)}
        />
      </table>
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood((prev) => prev + 1)}>good</Button>
      <Button onClick={() => setNeutral((prev) => prev + 1)}>neutral</Button>
      <Button onClick={() => setBad((prev) => prev + 1)}>bad</Button>
      <br />
      <h1>Statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        "No feedback given"
      )}
    </>
  );
};

export default App;
