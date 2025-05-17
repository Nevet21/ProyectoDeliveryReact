const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-300 text-gray-600 text-center py-4 mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Admin Domicilios. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default AdminFooter;
