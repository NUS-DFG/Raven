import axios from "axios";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
  GET_PROJECT,
  EDIT_PROJECT,
  SEARCH_PROJECTS,
  EDIT_PROJECT_IMAGE,
  UPDATE_PROJECT_IMAGE_SRC,
} from "./types";
import { getImgSource } from "../helpers/imageProcessing";
import backendURI from "../../config";

export const getProjects = () => async (dispatch) => {
  dispatch(setProjectsLoading());
  await axios.get("/api/projects").then((res) =>
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  );
};

export const deleteProject = (id) => (dispatch) => {
  axios
    .delete(`${backendURI}/api/projects/${id}`)
    .then((res) => dispatch({ type: DELETE_PROJECT, payload: id }));
};

export const addProject = (project) => (dispatch) => {
  axios.post(`${backendURI}/api/projects`, project).then((res) =>
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    })
  );
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};

export const getProject = (id) => async (dispatch) => {
  dispatch(setProjectsLoading());
  await axios.get(`${backendURI}/api/projects/${id}`).then((res) => {
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  });
};

export const editProject = (id, project) => (dispatch) => {
  axios.put(`${backendURI}/api/projects/${id}`, project).then((res) => {
    dispatch({
      type: EDIT_PROJECT,
      payload: res.data,
    });
  });
};

export const getSearchProjects = (query) => (dispatch) => {
  axios.get(`${backendURI}/search/${query}`).then((res) =>
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  );
};
export const editProjectImage = (project) => async (dispatch) => {
  await axios.post(`${backendURI}/api/projects/upload`, project).then((res) => {
    dispatch({
      type: EDIT_PROJECT_IMAGE,
      payload: res.data,
    });
  });
};

export const updateProjectImageSrc = (id) => async (dispatch) => {
  await axios.get(`${backendURI}/api/projects/${id}`).then((res) => {
    dispatch({
      type: UPDATE_PROJECT_IMAGE_SRC,
      imageSrc: getImgSource(res.data),
    });
  });
};
