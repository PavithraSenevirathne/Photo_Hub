import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressUpdateList = ({ updates, onDelete, onEdit, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [formState, setFormState] = useState({});
  const [filterType, setFilterType] = useState('ALL');
  const [sortOption, setSortOption] = useState('newest');

  const handleEditClick = (update) => {
    setEditId(update.id);
    setFormState({
      title: update.title,
      description: update.description,
      type: update.type,
      completedDate: update.completedDate?.slice(0, 10) || '',
      link: update.link || ''
    });
  };

  const handleUpdate = async (id) => {
    const { title, description, type, completedDate, link } = formState;

    if (!title || title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long ❗");
      return;
    }

    if (!description || description.trim().length < 10) {
      toast.error("Description must be at least 10 characters long ❗");
      return;
    }

    if (!type) {
      toast.error("Please select a type ❗");
      return;
    }

    if (!completedDate) {
      toast.error("Completed date is required ❗");
      return;
    }

    if (completedDate) {
      const selectedDate = new Date(completedDate);
      const now = new Date();
      if (selectedDate > now) {
        toast.error("Completed date cannot be in the future ❗");
        return;
      }
    }

    if (link && !/^https?:\/\/\S+\.\S+/.test(link)) {
      toast.error("Please enter a valid link ❗");
      return;
    }

    try {
      const formattedData = {
        ...formState,
        progressDate: new Date().toISOString(),
        completedDate: formState.completedDate ? `${formState.completedDate}T00:00:00` : null
      };
      await onUpdate(id, formattedData);
      setEditId(null);
    } catch (err) {
      toast.error("Failed to update ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
    } catch (err) {
      toast.error("Failed to delete ❌");
    }
  };

  const filteredAndSortedUpdates = updates
    .filter(update => {
      return filterType === 'ALL' || update.type === filterType;
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return new Date(b.progressDate) - new Date(a.progressDate);
      if (sortOption === 'oldest') return new Date(a.progressDate) - new Date(b.progressDate);
      if (sortOption === 'completed_asc') return new Date(a.completedDate) - new Date(b.completedDate);
      if (sortOption === 'completed_desc') return new Date(b.completedDate) - new Date(a.completedDate);
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 text-gray-100">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 p-6 rounded-t-xl mb-6">
        <h1 className="text-2xl font-bold">Your Learning Journey</h1>
        <p className="mt-2 opacity-80">Track and manage your learning progress updates</p>
      </div>

      {/* Filter and Sort */}
      <div className="bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <select
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
              className="w-full px-4 py-2.5 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Types</option>
              <option value="COMPLETED_TUTORIAL">Completed Tutorial</option>
              <option value="LEARNED_CONCEPT">Learned Concept</option>
              <option value="FINISHED_PROJECT">Finished Project</option>
              <option value="READ_ARTICLE">Read Article</option>
              <option value="JOINED_CHALLENGE">Joined Challenge</option>
              <option value="ACHIEVED_GOAL">Achieved Goal</option>
            </select>

            <select
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
              className="w-full px-4 py-2.5 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="completed_asc">Completed Date ↑</option>
              <option value="completed_desc">Completed Date ↓</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            Showing {filteredAndSortedUpdates.length} updates
          </div>
        </div>
      </div>

      {/* Updates */}
      <div className="space-y-4">
        {filteredAndSortedUpdates.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-xl shadow-sm">
            <h3 className="mt-2 text-sm font-medium text-gray-300">No updates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filterType === 'ALL' ? "Start by adding your first update!" : "No updates found for the selected filter."}
            </p>
          </div>
        ) : (
          filteredAndSortedUpdates.map(update => (
            <div key={update.id} className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {editId === update.id ? (
                <form className="p-6 space-y-6">
                  <input
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-600"
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    placeholder="Title"
                  />
                  <textarea
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-600 min-h-[120px]"
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-600"
                      value={formState.type}
                      onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    >
                      <option value="COMPLETED_TUTORIAL">Completed Tutorial</option>
                      <option value="LEARNED_CONCEPT">Learned Concept</option>
                      <option value="FINISHED_PROJECT">Finished Project</option>
                      <option value="READ_ARTICLE">Read Article</option>
                      <option value="JOINED_CHALLENGE">Joined Challenge</option>
                      <option value="ACHIEVED_GOAL">Achieved Goal</option>
                    </select>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-600"
                      value={formState.completedDate}
                      onChange={(e) => setFormState({ ...formState, completedDate: e.target.value })}
                      max={new Date().toLocaleDateString('en-CA')}
                    />
                  </div>
                  <input
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-600"
                    value={formState.link}
                    onChange={(e) => setFormState({ ...formState, link: e.target.value })}
                    placeholder="Resource link (optional)"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                      className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(update.id)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-100">{update.title}</h2>
                      <div className="mt-1 flex items-center gap-2 text-sm text-purple-300">
                        <span>{update.type.replace(/_/g, ' ')}</span>
                        <span className="text-gray-400">
                          • {new Date(update.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(update)}
                        className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900 rounded-lg"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(update.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-lg"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">{update.description}</p>
                  {update.link && (
                    <a
                      href={update.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-purple-400 hover:text-purple-200 underline"
                    >
                      View Resource
                    </a>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                    Progress added on {new Date(update.progressDate).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProgressUpdateList;
