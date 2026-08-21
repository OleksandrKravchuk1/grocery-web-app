import { PackageOpenIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { OrderList } from "@/features/order/components/OrderList";
import { getUserOrders } from "@/features/order/services/orders";
import { createClient } from "@/lib/supabase/server";

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(ROUTES.auth.signIn);
  }

  const orders = await getUserOrders();

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-4xl animate-in fade-in duration-500">
        <PageHeader
          title="Order History"
          description="View and track your past orders"
          icon={<PackageOpenIcon className="h-5 w-5" />}
        />

        <OrderList orders={orders} />
      </div>
    </div>
  );
}
