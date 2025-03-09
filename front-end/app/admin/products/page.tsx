"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt: string;
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
            className="fixed inset-0  bg-black/50 z-40"
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
                  : "left-1/3 top-1/4  w-full max-w-lg rounded-xl shadow-xl"
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

const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}> = ({ isOpen, onClose, onConfirm, productName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <div>
            <h3 className="font-medium">
              Are you sure you want to delete this product?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              You are about to delete "
              <span className="font-medium">{productName}</span>". This action
              cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Product
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ProductForm: React.FC<{
  product?: Product;
  onSubmit: (data: Partial<Product>) => void;
  onClose: () => void;
  categories: string[];
}> = ({ product, onSubmit, onClose, categories }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    category: product?.category || categories[0],
    imageUrl: product?.imageUrl || "",
    inStock: product?.inStock ?? true,
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
          Product Name
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.inStock}
              onChange={() => setFormData({ ...formData, inStock: true })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={!formData.inStock}
              onChange={() => setFormData({ ...formData, inStock: false })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Out of Stock</span>
          </label>
        </div>
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
          {product ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.99,
    description:
      "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    inStock: true,
    createdAt: "2024-03-10T10:00:00Z",
  },
  {
    id: 2,
    name: "Premium Leather Wallet",
    price: 79.99,
    description: "Handcrafted genuine leather wallet with RFID protection.",
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    inStock: true,
    createdAt: "2024-03-09T15:30:00Z",
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 249.99,
    description:
      "Adjustable office chair with lumbar support and breathable mesh back.",
    category: "Home & Living",
    imageUrl:
      "https://images.unsplash.com/photo-1505843490578-27303d926bcd?w=500&q=80",
    inStock: false,
    createdAt: "2024-03-08T09:15:00Z",
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 199.99,
    description: "Advanced fitness tracker with heart rate monitoring and GPS.",
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
    inStock: true,
    createdAt: "2024-03-07T14:20:00Z",
  },
];

const categories = ["Electronics", "Fashion", "Home & Living", "Sports"];

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddProduct = (data: Partial<Product>) => {
    const newProduct: Product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: data.name!,
      price: data.price!,
      description: data.description!,
      category: data.category!,
      imageUrl: data.imageUrl!,
      inStock: data.inStock!,
      createdAt: new Date().toISOString(),
    };
    setProducts([newProduct, ...products]);
  };

  const handleEditProduct = (data: Partial<Product>) => {
    if (!editingProduct) return;
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...data } : product
      )
    );
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-4 md:p-8 mt-14">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold  text-primary dark:text-text ">
          Products
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Price Range:
          </span>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-500">
                $
              </span>
              <input
                type="number"
                min="0"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="w-24 pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 dark:text-gray-700"
              />
            </div>
            <span>to</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-500">
                $
              </span>
              <input
                type="number"
                min="0"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="w-24 pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 dark:text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
        <AnimatePresence>
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 md:h-56">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover text-gray-600 dark:text-gray-700"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setDeletingProduct(product)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="font-semibold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {product.category}
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setIsAddModalOpen(false)}
          categories={categories}
        />
      </Modal>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
      >
        <ProductForm
          product={editingProduct || undefined}
          onSubmit={handleEditProduct}
          onClose={() => setEditingProduct(null)}
          categories={categories}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={() => {
          if (deletingProduct) {
            handleDeleteProduct(deletingProduct.id);
          }
          setDeletingProduct(null);
        }}
        productName={deletingProduct?.name || ""}
      />
    </div>
  );
}
