import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

const defaultForm = {
  title: "",
  platform: "",
  shortDescription: "",
  url: "",
  category: "",
  completed: false,
  userId: loggedInUser?.id || "",
  imagePath: "",
  price: "",
  duration: "",
  level: "Beginner",
};

const CourseForm = ({ onSubmit, selected }) => {
  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selected) {
      setForm({
        ...defaultForm,
        ...selected,
        price: selected.price || "",
        duration: selected.duration || "",
        level: selected.level || "Beginner",
      });
      setPreview(selected.imagePath ? `http://localhost:8080${selected.imagePath}` : null);
    } else {
      setForm(defaultForm);
      setPreview(null);
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/skillsync/images/upload", formData);
      const imagePath = res.data;
      setForm((prev) => ({ ...prev, imagePath }));
      setPreview(`http://localhost:8080${imagePath}`);
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      toast.error("Image upload failed!");
    }
  };

  // ✅ Validate form before submit
  const validateForm = () => {
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return false;
    }
    if (!form.platform.trim()) {
      toast.error("Platform is required!");
      return false;
    }
    if (!form.shortDescription.trim()) {
      toast.error("Short Description is required!");
      return false;
    }
    if (!form.url.trim()) {
      toast.error("Course URL is required!");
      return false;
    }
    if (!form.category.trim()) {
      toast.error("Category is required!");
      return false;
    }
    if (!form.price || form.price <= 0) {
      toast.error("Valid price is required!");
      return false;
    }
    if (!form.duration.trim()) {
      toast.error("Duration is required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // ⛔ Don't submit if invalid

    try {
      await onSubmit(form);
      if (selected) {
        toast.success("Learning plan updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.success("Learning plan added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setForm(defaultForm);
      setPreview(null);
    } catch (error) {
      toast.error("Failed to submit the form!");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-5 border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-purple-400">
        {selected ? "✏️ Update Learning Plan" : "📘 Add New Learning Plan"}
      </h2>

      {/* Title */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter course title"
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Platform */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Platform</label>
        <input
          name="platform"
          value={form.platform}
          onChange={handleChange}
          placeholder="Platform (ex: Coursera)"
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Short Description</label>
        <textarea
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          placeholder="Brief summary about the learning plan..."
          className="w-full px-4 py-2 border border-gray-600 rounded-md h-24 resize-none focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-40 object-cover rounded-md border border-gray-600"
        />
      )}

      {/* Image Upload */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Upload Image</label>
        <input
          type="file"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-900 file:text-white hover:file:bg-purple-800"
        />
      </div>

      {/* URL */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Course URL</label>
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g. Frontend, Backend"
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Price (USD)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Ex: 150"
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Duration</label>
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Ex: 1 - 4 Weeks"
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        />
      </div>

      {/* Level */}
      <div>
        <label className="block font-medium text-gray-300 mb-1">Level</label>
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-purple-400 focus:outline-none bg-gray-800 text-gray-100"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Completed */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
          className="w-4 h-4 text-purple-400 border-gray-600 rounded focus:ring-purple-400"
        />
        <label className="text-sm text-gray-300">Mark as Completed</label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-purple-900 hover:bg-purple-800 text-white py-2 rounded-md text-sm font-semibold transition"
        >
          {selected ? "Update Learning Plan" : "Add Learning Plan"}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
