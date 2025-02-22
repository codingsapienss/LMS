import InstructorCourse from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { BarChart, Book, LogOut } from "lucide-react";

const InstructorDashboardPage = () => {
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Cources",
      value: "cources",
      component: <InstructorCourse />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructure View</h2>
          <nav>
            {menuItems.map((menuItem) => {
              return (
                <Button key={menuItem.value}>
                  <menuItem.icon className="mr-2 h-4 w-4" />
                  {menuItem.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default InstructorDashboardPage;
