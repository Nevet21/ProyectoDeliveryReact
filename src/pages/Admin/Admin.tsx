import AdminHeader from '../../components/Comp_pag_Admin/AdminHeader'
import SideBarAdmin from '../../components/Comp_pag_Admin/SideBarAdmin'
import AdminFooter from '../../components/Comp_pag_Admin/AdminFooter'

const AdminHome = () => {
  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="flex-1 bg-gray-50 min-h-screen flex flex-col">
        <AdminHeader />

        <main className="pt-20 px-6 flex-1">
          <h1 className="text-3xl font-bold text-red-600 mb-6">Bienvenido al Panel de Administración</h1>

          <p className="text-gray-700 text-lg max-w-3xl mb-10">
            Nuestra misión es conectar a los mejores restaurantes con los clientes más exigentes,
            ofreciendo entregas rápidas, confiables y deliciosas. Gestiona todos los aspectos de tu
            sistema de domicilios desde este panel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
              alt="Domicilio en moto"
              className="rounded-xl shadow-md"
            />
                <img
            src="https://i.blogs.es/87930e/comidas-ricas/1366_2000.jpg"
            alt="Comida lista para entrega"
            className="rounded-xl shadow-md"
            />
            <img
            src="https://www.merca2.es/wp-content/uploads/2019/08/background-3470205_960_720.jpg"
            alt="Aplicación de pedidos"
            className="rounded-xl shadow-md"
            />

          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminHome;

