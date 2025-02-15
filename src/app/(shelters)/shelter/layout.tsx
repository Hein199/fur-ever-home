import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "My Shelter",
      url: "#",
      items: [
        {
          title: "Media",
          url: "/shelter/",
        },
        {
          title: "Applications",
          url: "/shelter/applications",
        },   {
          title: "Profile",
          url: "/shelter/profile",
        },
        {
          title: "Appointments",
          url: "/shelter/appointments",
        },
      ],
    },
  ],
};

const ShelterLayout = ({ children }:{
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

export default ShelterLayout;