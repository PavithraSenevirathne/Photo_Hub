import { useState } from 'react';
import { toast } from 'react-toastify';

const ProgressUpdateForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [type, setType] = useState(initialData?.type || 'COMPLETED_TUTORIAL');
  const [completedDate, setCompletedDate] = useState(initialData?.completedDate || '');
  const [link, setLink] = useState(initialData?.link || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('COMPLETED_TUTORIAL');
    setCompletedDate('');
    setLink('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long ❗");
      setIsSubmitting(false);
      return;
    }

    if (!description || description.trim().length < 10) {
      toast.error("Description must be at least 10 characters long ❗");
      setIsSubmitting(false);
      return;
    }

    if (!type) {
      toast.error("Please select a type ❗");
      setIsSubmitting(false);
      return;
    }

    if (!completedDate) {
      toast.error("Completed date is required ❗");
      setIsSubmitting(false);
      return;
    }

    const selectedDate = new Date(completedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      toast.error("Completed date cannot be in the future ❗");
      setIsSubmitting(false);
      return;
    }

    if (link && !/^https?:\/\/\S+\.\S+/.test(link)) {
      toast.error("Please enter a valid link (must start with http/https) ❗");
      setIsSubmitting(false);
      return;
    }

    const progressDate = new Date().toISOString();
    const formattedCompletedDate = completedDate || null;

    onSubmit({
      title,
      description,
      type,
      progressDate,
      completedDate: formattedCompletedDate,
      link,
    });

    toast.success('Progress updated successfully! 🎉');
    resetForm();
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto text-gray-100">
      <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-800 p-6">
          <h1 className="text-2xl font-bold">🚀 Track Your Learning Journey</h1>
          <p className="mt-1 opacity-80">Share your progress and achievements with the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gray-900">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300">Title</label>
              <input
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="What did you accomplish?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300">Description</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[120px]"
                placeholder="What did you learn?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300">Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="COMPLETED_TUTORIAL">Completed Tutorial</option>
                  <option value="LEARNED_CONCEPT">Learned Concept</option>
                  <option value="FINISHED_PROJECT">Finished Project</option>
                  <option value="READ_ARTICLE">Read Article</option>
                  <option value="JOINED_CHALLENGE">Joined Challenge</option>
                  <option value="ACHIEVED_GOAL">Achieved Goal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300">Completed Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={completedDate}
                  onChange={(e) => setCompletedDate(e.target.value)}
                  max={new Date().toLocaleDateString('en-CA')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300">Resource Link (Optional)</label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {initialData ? 'Update Progress' : 'Share Progress'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgressUpdateForm;
