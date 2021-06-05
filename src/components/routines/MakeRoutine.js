import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { createRoutines } from "../../api";

const MakeRoutine = ({ setDisplayMessage, setIsShown, isLoggedIn }) => {
  const [newRoutine, setNewRoutine] = useState();
  const [finished, setFinished] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const [name, goal] = event.target;

    if (name.value && goal.value) {
      const newRoutine = {
        name: name.value,
        goal: goal.value,
        isPublic: true,
      };
      setNewRoutine(newRoutine);
    } else {
      alert("Make sure all fields are filled in...");
    }
  };

  useEffect(async () => {
    if (newRoutine) {
      try {
        const response = await createRoutines(newRoutine);
        console.log(response);
        setFinished(true);
        alert("Sucessfully Created a Routine!");
      } catch (error) {
        console.error(error);
      } finally {
        <Redirect to="/myroutines" />;
      }
    }
  }, [newRoutine]);

  if (finished) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="makeRoutine">
        <h2>Create a Routine:</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" placeholder="Name" />
          </div>
          <div>
            <label>Goal</label>
            <input type="text" placeholder="Goal" />
          </div>
          <button className="submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default MakeRoutine;
