/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { createCategory } from "@/app/dashboard/actions/create";
import Button from "@/app/components/btn/Button";

export interface CategoryFormData {
  name: string;
  slug: string;
  image: string;
  description: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_KEY;

export default function AddNewCategoryPage() {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<CategoryFormData>>({});
  const router = useRouter();
  // Auto-generate slug with unique suffix
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.name),
      }));
    }
  }, [formData.name]);

  // ✅ Validation function
  const validateForm = () => {
    const newErrors: Partial<CategoryFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CategoryFormData]) {
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

    setIsSubmitting(true);
    try {
      await createCategory(formData);
      toast.success("Category created successfully");
      setFormData({
        name: "",
        slug: "",
        image: "",
        description: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  // ✅ Image Upload Handlers
  const onImageUploadStart = () => {
    console.log('starting upload');
    
    setIsImageUploading(true);
  }
  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, image: res.url })); // ✅ Correct field name
    toast.success("Image uploaded successfully");
    setIsImageUploading(false);
  };
  const onImageUploadError = (err: any) => {
    console.error(err);
    toast.error("Image upload failed");
    setIsImageUploading(false);
  };

  // ✅ Enable save button only when all conditions are met
  const canSave =
    !isSubmitting &&
    !isImageUploading &&
    formData.name.trim() &&
    formData.description.trim() &&
    formData.image;
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      {/* <ArrowLeft className="cursor-pointer my-4" onClick={() => router.back()} /> */}
<ToastContainer />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/admin/categories"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft
              size={18}
              className="mr-2 flex items-center text-gray-700 hover:text-gray-90"
              onClick={() => router.back()}
            />
            Back
          </Link>
          <h2 className="text-2xl font-semibold">Add New Category</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Category Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.name ? " border-red-500" : ""
              }`}
              placeholder="Enter category title"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Slug */}
          <input type="hidden" name="slug" value={formData.slug} />

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
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter category description"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium">Image</label>
            <Upload size={20} className="text-teal-500" />

            <ImageKitProvider
              publicKey={publicKey!}
              urlEndpoint={urlEndpoint!}
              authenticator={getImageAuth}
            >
              <IKUpload
                folder={"/matrix-shop/categories"}
                onSuccess={onImageUploadSuccess}
                onUploadStart={onImageUploadStart}
                onError={onImageUploadError}
                className="mt-1 w-full"
              />
            </ImageKitProvider>

            {isImageUploading && (
              <p className="text-teal-600 text-sm mt-1">
                Uploading image, please wait...
              </p>
            )}

            {formData.image && (
              <div className="mt-2">
                <Image
                  src={formData.image}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="h-20 w-20 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {errors.image && (
              <span className="text-red-500 text-sm">{errors.image}</span>
            )}
          </div>

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
              {isSubmitting ? "Saving..." : "Save Category"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
