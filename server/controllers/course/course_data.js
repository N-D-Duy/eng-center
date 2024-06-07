const { default: mongoose } = require('mongoose');
const Course = require('../../../models/course.js');
const CourseStudent = require('../../../models/course_student.js');
const teacher = require('../../../models/teacher.js');
const { triggerCourseStudentJoin, triggerCourseStudentLeave } = require('../course_student/index.js');
const Student = require('../../../models/student.js');

const joinCourse = async (req, res) => {
  try {
    triggerCourseStudentJoin(req, res);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const leaveCourse = async (req, res) => {
  try {
    triggerCourseStudentLeave(req, res);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    //get course with teacher info from teacher schema
    const courses = await Course.find().populate('teacher').exec();
    if (!courses) {
      return res.status(404).json({
        message: 'No courses found'
      });
    }

    return res.status(200).json({
      data: courses
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

//get courses that are created in the last 7 days
const getNewCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    if (!courses) {
      return res.status(404).json({
        message: 'No courses found'
      });
    }
    return res.status(200).json({
      data: courses
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).exec();
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    return res.status(200).json({
      data: course
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const createCourse = async (req, res) => {
  try { 
    const course = await Course.create(req.body);
    return res.status(201).json({
      data: course
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body);
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }
    const updatedCourse = await Course.findById(id);
    return res.status(200).json({
      data: updatedCourse
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }
    return res.status(200).json({
      message: 'Course deleted successfully'
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
}

const findCourse = async (req, res) => {
  try {
    const { name } = req.query;
    const course = await Course.find({ name: name });
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }
    return res.status(200).json({
      data: course
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};



const getAllStudentsInCourse = async (req, res) => {
  try {
    // Lấy Course ID từ body
    console.log(req.body);
    const { course } = req.body;
    console.log(course);

    // Tìm tất cả các course_student với Course ID đã cho
    const courseData = await CourseStudent.find({ course: course }).populate('student');
    
    // Kiểm tra nếu không tìm thấy dữ liệu nào
    if (!courseData.length) {
      return res.status(404).json({
        message: 'Course not found or no students enrolled'
      });
    }

    // Trích xuất danh sách sinh viên từ kết quả truy vấn
    const students = courseData.map(cs => cs.student);

    return res.status(200).json({
      data: students
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  findCourse,
  getNewCourses,
  joinCourse,
  leaveCourse,
  getAllStudentsInCourse
}