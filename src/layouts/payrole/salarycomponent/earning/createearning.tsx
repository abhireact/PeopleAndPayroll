import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EarningForm from "layouts/payrole/salarycomponent/earning/earningform";
function CreatePage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <EarningForm />
    </DashboardLayout>
  );
}

export default CreatePage;
