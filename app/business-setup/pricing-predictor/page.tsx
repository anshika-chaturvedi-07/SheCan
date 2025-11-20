import { AppSidebar } from "@/components/app-sidebar";
import PricingPredictorPage from "@/components/dashboard-pages/pricing-predictor-page";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function PricingPredictor() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8">
          <PricingPredictorPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
