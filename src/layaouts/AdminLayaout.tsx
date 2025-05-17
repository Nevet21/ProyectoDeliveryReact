import SideBarAdmin from '../components/Comp_pag_Admin/SideBarAdmin';
import AdminHeader from '../components/Comp_pag_Admin/AdminHeader';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    
    <div className="min-h-screen flex">
      <SideBarAdmin />
      <div className="flex-1 min-h-screen bg-gray-50">
        <AdminHeader />
        <main className="pt-16 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
