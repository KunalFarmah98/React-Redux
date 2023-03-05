import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../redux/actions/courseActions";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.dispatch(courseActions.createCourse(this.state.course));  // no mapDispatchToProps
    // this.props.createCourse(this.state.course); // with manual mapping of dispatch or with object passed as mapDispatchToProps
    this.props.actions.createCourse(this.state.course); //with bindActionCreators
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h2>Courses</h2>
          <h3>Add Course</h3>

          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />
        </form>

        {this.props.courses
          ? this.props.courses.map((course) => (
              <div key={course.title}>{course.title}</div>
            ))
          : null}
      </>
    );
  }
}

// this page only needs access to courses
const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.courses,
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
    actions: bindActionCreators(courseActions, dispatch), // automatically wraps all actions with dispatch and will give 1 actions prop
  };
};

// making mapDispatchToProps an object
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
