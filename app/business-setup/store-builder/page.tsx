import { AppSidebar } from "@/components/app-sidebar";
import StoreBuilderPage from "@/components/dashboard-pages/store-builder-page";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function StoreBuilder() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8">
          <StoreBuilderPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}