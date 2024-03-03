import { createContext, useReducer, useEffect } from "react";
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
} from "../api/client.mjs";

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
    let [newProject, newColumnArray] = await postProject(project);

    if (newProject && newColumnArray) {
      appDispatch({
        type: "ADD_PROJECT",
        payload: {
          newProject,
          newColumnArray,
        },
      });
    }
    selectNewProject(newProject.id);
  }

  async function editProject(id, project) {
    let [updatedProject, updatedColumnArray] = await updateProject(id, project);

    if (updateProject && updatedColumnArray) {
      appDispatch({
        type: "EDIT_PROJECT",
        payload: { id, updatedProject, updatedColumnArray },
      });
    }
  }

  async function deleteProject(id) {
    let response = await removeProject(id);

    if (response.id === id) {
      appDispatch({
        type: "DELETE_PROJECT",
        payload: { id },
      });
    }
  }

  async function addTask(task) {
    let [newTaskArray, newSubtaskArray] = await postTask(task);

    if (newTaskArray && newSubtaskArray) {
      appDispatch({
        type: "ADD_TASK",
        payload: { newTaskArray, newSubtaskArray },
      });
    }
  }

  async function editTask(id, task) {
    let [updatedTask, updatedSubtaskArray] = await updateTask(id, task);

    if (updatedTask && updatedSubtaskArray) {
      appDispatch({
        type: "EDIT_TASK",
        payload: { id, updatedTask, updatedSubtaskArray },
      });
    }
  }

  async function deleteTask(id) {
    let response = await removeTask(id);

    if (response.id === id) {
      appDispatch({
        type: "DELETE_TASK",
        payload: { id },
      });
    }
  }

  async function editTaskDetail(id, newTaskDetail) {
    let [updatedTask, updatedSubtaskArray] = await updateTaskDetail(
      id,
      newTaskDetail
    );

    if (updatedTask && updatedSubtaskArray) {
      appDispatch({
        type: "EDIT_TASK",
        payload: { id, updatedTask, updatedSubtaskArray },
      });
    }
  }

  useEffect(() => {
    fetchProject().then(([projectArray, columnArray]) => {
      appDispatch({
        type: "FETCH_PROJECT",
        payload: { projectArray, columnArray },
      });
    });
    fetchTask().then(([taskArray, subtaskArray]) => {
      appDispatch({
        type: "FETCH_TASK",
        payload: { taskArray, subtaskArray },
      });
    });
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
  };
  return (
    <DataContext.Provider value={ctxValue}>{children}</DataContext.Provider>
  );
}
