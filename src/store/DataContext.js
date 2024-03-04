import { createContext, useReducer, useEffect, useState } from "react";
import {
  fetchProject,
  postProject,
  removeProject,
  updateProject,
  fetchTask,
  postTask,
  updateTask,
  removeTask,
  updateTaskDetail,
} from "../http.js";

export const DataContext = createContext(null);

function appReducer(state, action) {
  if (action.type === "FETCH_PROJECT") {
    return {
      ...state,
      selectedProjectId:
        action.payload.projectArray.length !== 0
          ? action.payload.projectArray[0].id
          : null,
      projectArray: [...action.payload.projectArray],
      columnArray: [...action.payload.columnArray],
    };
  }

  if (action.type === "FETCH_TASK") {
    return {
      ...state,
      taskArray: [...action.payload.taskArray],
      subtaskArray: [...action.payload.subtaskArray],
    };
  }

  if (action.type === "SELECT_PROJECT") {
    return {
      ...state,
      selectedProjectId: action.payload.newProjectId,
    };
  }

  if (action.type === "ADD_PROJECT") {
    return {
      ...state,
      projectArray: [...state.projectArray, action.payload.newProject],
      columnArray: [...state.columnArray, ...action.payload.newColumnArray],
    };
  }

  if (action.type === "EDIT_PROJECT") {
    let tempProject = [...state.projectArray];
    let tempColumn = [...state.columnArray].filter(
      (col) => col.project_id !== action.payload.id
    );
    let tempProjectIndex = tempProject.findIndex(
      (project) => project.id === action.payload.id
    );
    tempProject[tempProjectIndex] = action.payload.updatedProject;

    return {
      ...state,
      projectArray: tempProject,
      columnArray: [...tempColumn, ...action.payload.updatedColumnArray],
    };
  }

  if (action.type === "DELETE_PROJECT") {
    return {
      ...state,
      selectedProjectId:
        state.projectArray.length !== 0 ? state.projectArray[0].id : null,
      projectArray: [...state.projectArray].filter(
        (project) => project.id !== action.payload.id
      ),
      columnArray: [...state.columnArray].filter(
        (col) => col.project_id !== action.payload.id
      ),
    };
  }

  if (action.type === "ADD_TASK") {
    return {
      ...state,
      taskArray: [...state.taskArray, ...action.payload.newTaskArray],
      subtaskArray: [...state.subtaskArray, ...action.payload.newSubtaskArray],
    };
  }

  if (action.type === "EDIT_TASK") {
    let tempTask = [...state.taskArray];
    let tempSubtask = [...state.subtaskArray].filter(
      (subtask) => subtask.task_id !== action.payload.id
    );
    let curretnTaskIndex = tempTask.findIndex(
      (task) => task.id === action.payload.id
    );
    tempTask[curretnTaskIndex] = action.payload.updatedTask;

    return {
      ...state,
      taskArray: tempTask,
      subtaskArray: [...tempSubtask, ...action.payload.updatedSubtaskArray],
    };
  }

  if (action.type === "DELETE_TASK") {
    return {
      ...state,
      taskArray: [...state.taskArray].filter(
        (task) => task.id !== action.payload.id
      ),
      subtaskArray: [...state.subtaskArray].filter(
        (subtask) => subtask.project_id !== action.payload.id
      ),
    };
  }
}

export default function DataContextProvider({ children }) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState({});
  const [appState, appDispatch] = useReducer(appReducer, {
    selectedProjectId: null,
    projectArray: [],
    columnArray: [],
    taskArray: [],
    subtaskArray: [],
  });

  function selectNewProject(newProjectId) {
    appDispatch({
      type: "SELECT_PROJECT",
      payload: { newProjectId },
    });
  }

  async function addProject(project) {
    try {
      setIsLoading({ addProject: true });
      let [newProject, newColumnArray] = await postProject(project);
      appDispatch({
        type: "ADD_PROJECT",
        payload: {
          newProject,
          newColumnArray,
        },
      });
      selectNewProject(newProject.id);
    } catch (error) {
      setError({ message: error.message || "Failed to create the project" });
    }
    setIsLoading({ addProject: false });
  }

  async function editProject(id, project) {
    try {
      setIsLoading({ editProject: true });
      let [updatedProject, updatedColumnArray] = await updateProject(
        id,
        project
      );

      appDispatch({
        type: "EDIT_PROJECT",
        payload: { id, updatedProject, updatedColumnArray },
      });
    } catch (error) {
      setError({ message: error.message || "Failed to edit the project" });
    }
    setIsLoading({ addProject: false });
  }

  async function deleteProject(id) {
    appDispatch({
      type: "DELETE_PROJECT",
      payload: { id },
    });
    try {
      await removeProject(id);
    } catch (error) {
      let deletedProject = appState.projectArray.find(
        (project) => project.id === id
      );
      let deleteColumnArray = appState.columnArray.filter(
        (col) => col.project_id === id
      );
      appDispatch({
        type: "ADD_PROJECT",
        payload: {
          deletedProject,
          deleteColumnArray,
        },
      });
      setError({ message: error.message || "Failed to delete the project" });
    }
  }

  async function addTask(task) {
    try {
      setIsLoading({ addTask: true });
      let [newTaskArray, newSubtaskArray] = await postTask(task);

      if (newTaskArray && newSubtaskArray) {
        appDispatch({
          type: "ADD_TASK",
          payload: { newTaskArray, newSubtaskArray },
        });
      }
    } catch (error) {
      setError({ message: error.message || "Failed to create the task" });
    }
    setIsLoading({ addTask: false });
  }

  async function editTask(id, task) {
    try {
      setIsLoading({ editTask: true });
      let [updatedTask, updatedSubtaskArray] = await updateTask(id, task);

      appDispatch({
        type: "EDIT_TASK",
        payload: { id, updatedTask, updatedSubtaskArray },
      });
    } catch (error) {
      setError({ message: error.message || "Failed to edit the task" });
    }
    setIsLoading({ editTask: false });
  }

  async function deleteTask(id) {
    appDispatch({
      type: "DELETE_TASK",
      payload: { id },
    });

    try {
      await removeTask(id);
    } catch (error) {
      let deletedTask = appState.taskArray.find((task) => task.id === id);
      let deletedSubtaskArray = appState.subtaskArray.filter(
        (subtask) => subtask.task_id === id
      );

      appDispatch({
        type: "ADD_TASK",
        payload: { deletedTask, deletedSubtaskArray },
      });
      setError({ message: error.message || "Failed to delete the task" });
    }
  }

  async function editTaskDetail(id, newTaskDetail) {
    try {
      setIsLoading({ editTaskDetail: true });
      let [updatedTask, updatedSubtaskArray] = await updateTaskDetail(
        id,
        newTaskDetail
      );

      appDispatch({
        type: "EDIT_TASK",
        payload: { id, updatedTask, updatedSubtaskArray },
      });
    } catch (error) {
      setError({
        message: error.message || "Failed to update the task details",
      });
    }
    setIsLoading({ editTaskDetail: false });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading({ fetchData: true });
        const [projectArray, columnArray] = await fetchProject();
        const [taskArray, subtaskArray] = await fetchTask();
        appDispatch({
          type: "FETCH_PROJECT",
          payload: { projectArray, columnArray },
        });
        appDispatch({
          type: "FETCH_TASK",
          payload: { taskArray, subtaskArray },
        });
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data" });
      }
      setIsLoading({ fetchData: false });
    }

    fetchData();
  }, []);

  const ctxValue = {
    ...appState,
    selectNewProject,
    addProject,
    deleteProject,
    editProject,
    addTask,
    editTask,
    deleteTask,
    editTaskDetail,
    isLoading,
    error,
  };
  return (
    <DataContext.Provider value={ctxValue}>{children}</DataContext.Provider>
  );
}
