"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, X, Menu } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={
              isMobile
                ? { opacity: 1, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={
              isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              isMobile
                ? { opacity: 1, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white overflow-hidden
              ${
                isMobile
                  ? "bottom-0 left-0 right-0 rounded-t-xl max-h-[90vh] overflow-y-auto"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl shadow-xl"
              }`}
          >
            <div className="sticky top-0 flex justify-between items-center border-b border-gray-200 p-4 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CategoryForm: React.FC<{
  category?: Category;
  onSubmit: (data: Partial<Category>) => void;
  onClose: () => void;
}> = ({ category, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    imageUrl: category?.imageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {category ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Smartphones, laptops, and gadgets",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    productCount: 156,
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, shoes, and accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
    productCount: 243,
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Furniture, decor, and kitchenware",
    imageUrl:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80",
    productCount: 189,
  },
  {
    id: 4,
    name: "Sports",
    description: "Equipment, clothing, and accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80",
    productCount: 94,
  },
];

function CategoryComponent() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (data: Partial<Category>) => {
    const newCategory: Category = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      name: data.name!,
      description: data.description!,
      imageUrl: data.imageUrl!,
      productCount: 0,
    };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (data: Partial<Category>) => {
    if (!editingCategory) return;
    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id ? { ...category, ...data } : category
      )
    );
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50 mt-12 w-full border border-red-500">
      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="p-4  md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Categories
              </h1>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline">Add Category</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-36 md:h-48">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {category.productCount} Products
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
      >
        <CategoryForm
          category={editingCategory || undefined}
          onSubmit={handleEditCategory}
          onClose={() => setEditingCategory(null)}
        />
      </Modal>
    </div>
  );
}

export default CategoryComponent;
