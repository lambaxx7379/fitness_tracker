import React, { useState } from "react";
import { fetchAllActivites, createActivity } from "../api";

const Activities = ({ activities, isLoggedIn, setActivities }) => {
  const [newActivity, setNewActivity] = useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await createActivity(newActivity);
      console.log(response);
      if (response.id) {
        alert("sucess creating activity");
        setActivities(await fetchAllActivites());
      } else {
        return alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <h2>Create an Activity:</h2>
          <label>Activity Name:</label>
          <input
            name="Name"
            required
            onChange={(event) =>
              setNewActivity({ ...newActivity, name: event.target.value })
            }
          />
          <label>Description:</label>
          <input
            type="Description"
            required
            onChange={(e) =>
              setNewActivity({ ...newActivity, description: e.target.value })
            }
          />
          <button type="submit">submit</button>
        </form>
      ) : null}

      <h1>Activities</h1>
      {activities?.map((activity, index) => {
        return (
          <div key={index}>
            <h2>Activity: {activity.name}</h2>
            <span>Description:</span>
            <span>{activity.description}</span>
          </div>
        );
      })}
    </div>
  );
};
export default Activities;
