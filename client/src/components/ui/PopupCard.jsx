import axios from "axios";
import { toast } from 'sonner';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCollection } from "../../store/features/collection/CollectionSlice";

function PopupCard({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();

  const handleTags = () => {
    return tags.split(",").map(tag => tag.trim());
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const tagArray = handleTags();

    if (!title || !content || !link) {
      toast.error("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    if (!token || !userId) {
      toast.error("Authentication failed. Please log in again.");
      return;
    }

    try {
      await dispatch(addCollection({ title, content, link, tags: tagArray, userId, token }));
      setTitle("");
      setContent("");
      setLink("");
      setTags(""); 

      onClose();
      toast.success("Collection added successfully!");
    } catch (error) {
      toast.error("Failed to add collection. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Add New Collection
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="4"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter the content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter tags separated by comma"
            />
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Link
            </label>
            <input
              id="link"
              type="url"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter a valid URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-600 text-gray-300 hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupCard;
