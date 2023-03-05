import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export const loadCourseSuccess = (courses) => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};

export const updateCourseSuccess = (course) => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
};

export const createCourseSuccess = (course) => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
};

export const loadCourses = () => {
  return (dispatch) => {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  return (dispatch) => {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.if
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
};
