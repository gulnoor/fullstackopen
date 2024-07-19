import { useSelector, useDispatch } from "react-redux";
import { createNew, vote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  function createAnecdote(e) {
    e.preventDefault();
    dispatch(createNew(e.target.content.value));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
