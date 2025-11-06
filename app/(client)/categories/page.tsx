import PageBanner from "../../components/banner/PageBanner";
import CategoriesGrid from "../../components/categoriesGrid/CategoryGrid";

export default function CategoriesPage() {
  return (
    <>
      <PageBanner
        title="Shop by Category"
        subtitle="Discover furniture for every room — crafted with elegance and comfort."
        backgroundImage="/assets/chair1.jpg"
      />
      {/* Categories grid goes here */}
      <CategoriesGrid/>
    </>
  );
}