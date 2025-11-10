"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/dashboard/actions/create";
import Button from "@/app/components/btn/Button";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

export interface ProductFormData {
  name: string;
  slug: string;
  price: number;
  brand: string;
  oldPrice?: number;
  image: string;
  images: string[];
  description: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_KEY!;

export default function AddNewProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    price: 0,
    brand: "",
    oldPrice: undefined,
    image: "",
    images: [],
    description: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Auto-generate slug
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.name),
      }));
    }
  }, [formData.name]);

  const validateForm = () => {
    const newErrors: Partial<ProductFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Main image is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "oldPrice"
          ? parseFloat(value) || 0
          : value,
    }));

    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields");
      return;
    }
    if (isImageUploading || isGalleryUploading) {
      toast.error("Please wait for all images to finish uploading");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProduct(formData);
      toast.success("Product created successfully");
      setFormData({
        name: "",
        slug: "",
        price: 0,
        brand: "",
        oldPrice: undefined,
        image: "",
        images: [],
        description: "",
        categoryId: "",
      });
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Main ImageKit handlers
  const onImageUploadStart = () => setIsImageUploading(true);
  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, image: res.url }));
    toast.success("Main image uploaded successfully");
    setIsImageUploading(false);
  };
  const onImageUploadError = (err: any) => {
    console.error(err);
    toast.error("Main image upload failed");
    setIsImageUploading(false);
  };

  // Gallery ImageKit handlers
  const onGalleryUploadStart = () => setIsGalleryUploading(true);
  const onGalleryUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, res.url] }));
    setIsGalleryUploading(false);
    toast.success("Gallery image uploaded");
  };
  const onGalleryUploadError = (err: any) => {
    console.error(err);
    toast.error("Gallery upload failed");
    setIsGalleryUploading(false);
  };

  // Remove gallery image
  const removeGalleryImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  const canSave =
    !isSubmitting &&
    !isImageUploading &&
    !isGalleryUploading &&
    formData.name &&
    formData.price > 0 &&
    formData.description &&
    formData.image &&
    formData.categoryId;

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/admin/products"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft
              size={18}
              className="mr-2 text-gray-700 hover:text-gray-900"
              onClick={() => router.back()}
            />
            Back
          </Link>
          <h2 className="text-2xl font-semibold">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            {loadingCategories ? (
              <p className="text-gray-500 text-sm">Loading categories...</p>
            ) : (
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.categoryId ? "border-red-500" : ""
                }`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.categoryId && (
              <span className="text-red-500 text-sm">{errors.categoryId}</span>
            )}
          </div>

          {/* Price & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">{errors.price}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Old Price (optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice || ""}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-sm font-medium">Main Image</label>
            <Upload size={20} className="text-teal-500" />
            <ImageKitProvider
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={getImageAuth}
            >
              <IKUpload
                folder="/matrix-shop/products/main"
                onUploadStart={onImageUploadStart}
                onSuccess={onImageUploadSuccess}
                onError={onImageUploadError}
                className="mt-1 w-full"
              />
            </ImageKitProvider>
            {isImageUploading && (
              <p className="text-teal-600 text-sm mt-1">Uploading image...</p>
            )}
            {formData.image && (
              <div className="mt-2">
                <Image
                  src={formData.image}
                  alt="Main Preview"
                  width={100}
                  height={100}
                  className="h-20 w-20 object-cover"
                />
              </div>
            )}
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-sm font-medium">Gallery Images</label>
            <Upload size={20} className="text-teal-500" />
            <ImageKitProvider
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={getImageAuth}
            >
              <IKUpload
                folder="/matrix-shop/products/gallery"
                multiple
                onUploadStart={onGalleryUploadStart}
                onSuccess={onGalleryUploadSuccess}
                onError={onGalleryUploadError}
                className="mt-1 w-full"
              />
            </ImageKitProvider>
            {isGalleryUploading && (
              <p className="text-teal-600 text-sm mt-1">
                Uploading gallery images...
              </p>
            )}
            {formData.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((img) => (
                  <div key={img} className="relative">
                    <Image
                      src={img}
                      alt="Gallery Preview"
                      width={100}
                      height={100}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(img)}
                      className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!canSave}
              className={`bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all font-medium shadow-sm ${
                !canSave
                  ? "opacity-50 cursor-not-allowed hover:bg-teal-600 shadow-none"
                  : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
