const baseURL = "https://fitnesstrac-kr.herokuapp.com/api/";
import { Redirect } from "react-router-dom";

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

const token = getToken();

export const registerSubmit = async (username, password) => {
  let url = "http://fitnesstrac-kr.herokuapp.com/api/users/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.token) {
      alert("You have successfully registered!");
      setToken(data.token);
      location.reload();
      {
        localStorage.getItem("token") ? <Redirect to="/" /> : null;
      }
    }

    return data;
  } catch (error) {
    console.error("Error Message:", error);
  }
};

export const loginSubmit = async (username, password) => {
  let url = "http://fitnesstrac-kr.herokuapp.com/api/users/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.token) {
      alert("You have successfully logged in!");
      setToken(data.token);
      // location.reload();
      // {
      //   localStorage.getItem("token") ? <Redirect to="/" /> : null;
      // }
    }

    return data;
  } catch (error) {
    console.error("Error Message:", error);
  } finally {
    <Redirect to="/" />;
    location.reload();
  }
};

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${baseURL}users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchUserRoutines = async (username) => {
  try {
    const response = await fetch(`${baseURL}users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createRoutines = async (routine) => {
  try {
    const response = await fetch(`${baseURL}routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routine),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchAllRoutines = async () => {
  try {
    const response = await fetch(`${baseURL}routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchAllActivites = async () => {
  try {
    const response = await fetch(`${baseURL}activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const applyActivityToRoutine = async (
  routineId,
  activityIdV,
  countV,
  durationV
) => {
  console.log(activityIdV, countV, durationV);
  try {
    const response = await fetch(`${baseURL}routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId: activityIdV,
        count: countV,
        duration: durationV,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateRoutineApi = async (name, goal, routineId) => {
  let payload = {};
  console.log(goal);
  console.log(routineId);
  console.log(name);
  let newName = prompt("What would you like to change the name to?", name);
  let newGoal = prompt("What would you like to change the goal to?", goal);
  if (newName) {
    payload.name = newName;
  }
  if (newGoal) {
    payload.goal = newGoal;
  }
  console.log(routineId);
  try {
    const response = await fetch(`${baseURL}routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};
export const updateActivitiesApi = async (id, count, duration) => {
  let payload = {};
  console.log(id);
  console.log(count);
  console.log(duration);
  let newCount = prompt("What would you like to change the count?", count);
  let newDuration = prompt(
    "What would you like to change the duration?",
    duration
  );
  payload = { count: newCount, duration: newDuration };
  console.log(payload);
  try {
    const response = await fetch(`${baseURL}/routine_activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};
export const deleteActivityApi = async (id) => {
  try {
    const response = await fetch(`${baseURL}/routine_activities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};
export const deleteRoutineApi = async (id) => {
  console.log(id);
  console.log(token);
  try {
    const response = await fetch(`${baseURL}/routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};
export const createActivity = async (activity) => {
  try {
    const response = await fetch(`${baseURL}activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activity),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchRoutinesByActivity = async (activityId) => {
  try {
    const response = await fetch(
      `${baseURL}activities/${activityId}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
