import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import CourseForm from "./CourseForm";
import { Plus } from "lucide-react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:8080/skillsync/courses?userId=test");
    setCourses(res.data);
  };

  const handleAddOrUpdate = async (data) => {
    if (data._id) {
      await axios.put(`http://localhost:8080/skillsync/courses/update/${data._id}`, data);
    } else {
      await axios.post("http://localhost:8080/skillsync/courses", data);
    }
    setSelected(null);
    setShowForm(false);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/skillsync/courses/delete/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Delete failed:", err?.response?.data || err.message);
      alert("Failed to delete the course. Check console for more info.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-400">Learning Plans</h2>
        <button
          onClick={() => {
            setSelected(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <Plus size={18} />
          Add New Plan
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          <CourseForm onSubmit={handleAddOrUpdate} selected={selected} />
        </div>
      )}

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={(c) => {
              setSelected(c);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
