import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "User Account",
          url: "/admin/users",
        },
        {
          title: "Shelters",
          url: "/admin/shelters",
        }, {
          title: "Shelters Registration",
          url: "/admin/shelters-registration",
        },
        {
          title: "Pet Lists",
          url: "/admin/pets",
        },
        // {
        //   title: "Reports",
        //   url: "/admin/reports",
        // },
        {
          title: "Profile",
          url: "/admin/profile",
        },
      ],
    },
  ],
};

const AdminLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <SidebarProvider>
      <AppSidebar navData={data.navMain} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;