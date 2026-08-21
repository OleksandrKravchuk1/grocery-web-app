import { CategoryDetailView } from "@/features/category/components/CategoryDetailView";
import { getCategoryById } from "@/features/category/services/categories";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const categoryId = Number(id);
  const category = await getCategoryById(categoryId);

  return (
    <CategoryDetailView categoryId={categoryId} initialCategory={category} />
  );
}
