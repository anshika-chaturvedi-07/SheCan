import { AppSidebar } from "@/components/app-sidebar";
import DesignGeneratorPage from "@/components/dashboard-pages/design-generator-page";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


export default function DesignGenerator() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8">
          <DesignGeneratorPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}