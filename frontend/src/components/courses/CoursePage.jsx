import Navbar from "../main-main/Navbar";
import CourseList from "./CourseList";

export default function CoursePage() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen pt-4 text-white">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">
          📚 Your Learning Plans
        </h1>
        <div className="px-4">
          <CourseList />
        </div>
      </div>
    </>
  );
}
