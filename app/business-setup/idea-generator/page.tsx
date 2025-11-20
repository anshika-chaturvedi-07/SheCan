import { AppSidebar } from "@/components/app-sidebar";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import IdeaGeneratorPage from './../../../components/dashboard-pages/idea-generator-page';

export default function IdeaGenerator() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8">
          <IdeaGeneratorPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}