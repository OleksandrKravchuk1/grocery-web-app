import { LayoutDashboardIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { CategoryGrid } from "@/features/category/components/CategoryGrid";
import { getCategories } from "@/features/category/services/categories";

export default async function CategoryPageView() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-in fade-in duration-500">
        <PageHeader
          title="Categories"
          description="Browse products by category"
          icon={<LayoutDashboardIcon className="h-5 w-5" />}
        />
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
