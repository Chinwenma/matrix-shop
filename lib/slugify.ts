// Simple random string generator for unique suffix (alternative to UUID)
const generateUniqueSuffix = () => {
  return Math.random().toString(36).substring(2, 8); // 6-character random string
};

// Slugify function
const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

const slugifyWithUniqueSuffix = (str: string): string => {
  const slug = slugify(str);
  const uniqueSuffix = generateUniqueSuffix();
  return `${slug}-${uniqueSuffix}`;
};
export default slugifyWithUniqueSuffix;

export const isObjectId = (v: string) => /^[a-f0-9]{24}$/i.test(v);