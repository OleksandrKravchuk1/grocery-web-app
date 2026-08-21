import { ProductList } from "@/features/product/components/ProductList";

type Props = {
    title: string;
    categoryId: number;
}

export function CategorySection({ title, categoryId }: Props) {
    return (
        <section className="space-y-6">
            <h2 className="mt-8 px-4 text-2xl font-bold sm:px-0">{title}</h2>
            <ProductList categoryId={categoryId} />
        </section>
    );
}
