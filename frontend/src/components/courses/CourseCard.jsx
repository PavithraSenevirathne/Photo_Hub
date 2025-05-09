import { toast } from "react-toastify";
import { Pencil, Trash2, ArrowUpRight } from "lucide-react";

const CourseCard = ({ course, onEdit, onDelete }) => {
  const levelBadge = {
    Beginner: "bg-green-900 text-green-200",
    Intermediate: "bg-yellow-900 text-yellow-200",
    Advanced: "bg-red-900 text-red-200",
  };

  const handleEdit = () => {
    toast.info("Editing this learning plan...", {
      position: "top-right",
      autoClose: 2000,
      style: { backgroundColor: "#4ade80", color: "#064e3b" },
    });
    onEdit(course);
  };

  const handleDelete = () => {
    toast.success("Learning plan deleted.", {
      position: "top-right",
      autoClose: 2000,
      style: { backgroundColor: "#f87171", color: "#450a0a" },
    });
    onDelete(course.id);
  };

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-all border border-gray-700">
      {/* Image */}
      {course.imagePath && (
        <img
          src={`http://localhost:8080${course.imagePath}`}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}

      {/* Platform */}
      <p className="text-xs text-gray-400 font-semibold">{course.platform}</p>

      {/* Title */}
      <h2 className="text-xl font-bold text-indigo-400">{course.title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-300 mt-1">{course.shortDescription}</p>

      {/* Metadata */}
      <div className="text-sm text-gray-400 mt-3 space-y-1">
        <p><strong>Category:</strong> {course.category}</p>
        {course.price && <p><strong>Price:</strong> ${course.price}</p>}
        {course.duration && <p><strong>Duration:</strong> {course.duration}</p>}
        {course.level && (
          <p>
            <strong>Level:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${levelBadge[course.level] || "bg-gray-700 text-gray-300"}`}
            >
              {course.level}
            </span>
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-5 text-sm">
        <a
          href={course.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white transition px-3 py-1 rounded-full text-xs font-semibold"
        >
          Visit Course <ArrowUpRight className="w-4 h-4" />
        </a>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-600 transition px-3 py-1 rounded-full text-xs font-semibold"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 bg-red-700 text-white hover:bg-red-600 transition px-3 py-1 rounded-full text-xs font-semibold"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
