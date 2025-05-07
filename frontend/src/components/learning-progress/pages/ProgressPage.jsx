import { useEffect, useState } from 'react';
import {
  getProgressUpdates,
  createProgressUpdate,
  updateProgressUpdate,
  deleteProgressUpdate,
} from '../api/progressUpdateApi';
import ProgressUpdateList from '../components/ProgressUpdateList';
import ProgressUpdateForm from '../components/ProgressUpdateForm';
import Navbar from '../../main-main/Navbar';
import { toast } from 'react-toastify';
import { Plus } from 'lucide-react';

const ProgressPage = () => {
  const [updates, setUpdates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const data = await getProgressUpdates();
      setUpdates(data);
    } catch {
      toast.error("Failed to load updates ❌");
    }
  };

  const handleCreate = async (data) => {
    try {
      await createProgressUpdate(data);
      toast.success("Post created 🎉");
      load();
      setShowForm(false);
    } catch {
      toast.error("Failed to create post ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProgressUpdate(id);
      toast.success("Post deleted 🗑️");
      load();
    } catch {
      toast.error("Failed to delete ❌");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateProgressUpdate(id, data);
      toast.success("Update saved ✅");
      load();
    } catch {
      toast.error("Failed to update ❌");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-gray-100 px-4 py-6">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          📈 Progress Updates
        </h1>

        {/* Floating Action Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 z-50 flex items-center gap-2"
          aria-label="Add new progress update"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Progress</span>
        </button>

        {/* Creation Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 pt-16">
            <div className="bg-gray-800 text-gray-100 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProgressUpdateForm onSubmit={handleCreate} />
            </div>
          </div>
        )}

        {/* List of Updates */}
        <ProgressUpdateList
          updates={updates}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default ProgressPage;
