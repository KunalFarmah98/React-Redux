import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../redux/actions/courseActions";
import CourseList from "./CourseList";
import * as authorActions from "../../redux/actions/authorActions";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((e) => alert("loading courses failed: " + e));
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((e) => alert("loading authors failed: " + e));
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          {/*history is passed to all router objects */}
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

// this page only needs access to courses
const mapStateToProps = (state, ownProps) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
};

// manual mapping
// const mapDispatchToProps = (dispatch) => {
//   return {
//     createCourse: (course) => dispatch(courseActions.createCourse(course)),
//   };
// };

// bindActionCreators
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), // automatically wraps all actions with dispatch and will give 1 actions prop
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
};

// making mapDispatchToProps an object
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
