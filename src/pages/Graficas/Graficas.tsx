import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import Header from '../../components/Comp_Pag_Prin/Header'; // Usa tu Navbar original

const PieChart = ({ title, labels, data }: { title: string; labels: string[]; data: number[] }) => {
  const options = {
    chart: { type: 'pie' },
    labels,
    theme: { monochrome: { enabled: true } },
    dataLabels: {
      formatter(val: number, opts: any) {
        return [opts.w.globals.labels[opts.seriesIndex], val.toFixed(1) + '%'];
      },
    },
    legend: { show: false },
    title: { text: title, align: 'center' },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <ReactApexChart options={options} series={data} type="pie" height={300} />
    </div>
  );
};

const BarChart = ({ title, labels, data }: { title: string; labels: string[]; data: number[] }) => {
  const options = {
    chart: { type: 'bar', height: 350 },
    plotOptions: {
      bar: { borderRadius: 4, horizontal: true },
    },
    xaxis: { categories: labels },
    title: { text: title, align: 'center' },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <ReactApexChart options={options} series={[{ data }]} type="bar" height={300} />
    </div>
  );
};

const LineChart = ({ title, labels, series }: { title: string; labels: string[]; series: any[] }) => {
  const options = {
    chart: { type: 'line', height: 350, zoom: { enabled: false } },
    stroke: { width: 3, curve: 'straight' },
    xaxis: { categories: labels },
    title: { text: title, align: 'center' },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
};

const Graficas: React.FC = () => {
  const [dataReady, setDataReady] = useState(false);

  const [restaurantData, setRestaurantData] = useState<number>(0);
  const [productData, setProductData] = useState<number>(0);
  const [menuData, setMenuData] = useState<number>(0);
  const [customerData, setCustomerData] = useState<number>(0);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [addressData, setAddressData] = useState<number>(0);
  const [motoData, setMotoData] = useState<number>(0);
  const [driverData, setDriverData] = useState<number>(0);
  const [shiftData, setShiftData] = useState<number>(0);
  const [issueData, setIssueData] = useState<number>(0);
  const [photoData, setPhotoData] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          restaurants,
          products,
          menus,
          customers,
          orders,
          addresses,
          motorcycles,
          drivers,
          shifts,
          issues,
          photos,
        ] = await Promise.all([
          axiosInstance.get('/restaurants'),
          axiosInstance.get('/products'),
          axiosInstance.get('/menus'),
          axiosInstance.get('/customers'),
          axiosInstance.get('/orders'),
          axiosInstance.get('/addresses'),
          axiosInstance.get('/motorcycles'),
          axiosInstance.get('/drivers'),
          axiosInstance.get('/shifts'),
          axiosInstance.get('/issues'),
          axiosInstance.get('/photos'),
        ]);

        setRestaurantData(restaurants.data.length);
        setProductData(products.data.length);
        setMenuData(menus.data.length);
        setCustomerData(customers.data.length);
        setAddressData(addresses.data.length);
        setMotoData(motorcycles.data.length);
        setDriverData(drivers.data.length);
        setShiftData(shifts.data.length);
        setIssueData(issues.data.length);
        setPhotoData(photos.data.length);

        const groupedOrders = orders.data.reduce((acc: any, order: any) => {
          const rawDate = order.createdAt || order.date || order.timestamp;
          if (!rawDate) return acc;
          const date = new Date(rawDate).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        setOrderData(Object.entries(groupedOrders).map(([label, value]) => ({ label, value })));

        setDataReady(true);
      } catch (error) {
        console.error('❌ Error cargando datos:', error);
      }
    };

    loadData();
  }, []);

  if (!dataReady) return <div className="p-8 text-center text-gray-500">Cargando gráficas...</div>;

  return (
    <>
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Gráficas</h1>
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Pie Charts */}
          <PieChart
            title="Distribución de entidades clave"
            labels={['Restaurantes', 'Productos', 'Menús']}
            data={[restaurantData, productData, menuData]}
          />
          <PieChart
            title="Recursos humanos y logística"
            labels={['Conductores', 'Turnos', 'Motocicletas']}
            data={[driverData, shiftData, motoData]}
          />
          <PieChart
            title="Clientes y otros"
            labels={['Clientes', 'Direcciones', 'Fotos']}
            data={[customerData, addressData, photoData]}
          />

          {/* Bar Charts */}
          <BarChart
            title="Cantidad de incidencias"
            labels={['Issues', 'Shifts', 'Fotos']}
            data={[issueData, shiftData, photoData]}
          />
          <BarChart
            title="Contenido de la plataforma"
            labels={['Menús', 'Productos', 'Restaurantes']}
            data={[menuData, productData, restaurantData]}
          />
          <BarChart
            title="Logística general"
            labels={['Motocicletas', 'Conductores', 'Turnos']}
            data={[motoData, driverData, shiftData]}
          />

          {/* Line Charts */}
          <LineChart
            title="Órdenes por día"
            labels={
              orderData.length > 0
                ? orderData.map((d) => d.label)
                : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
            }
            series={[
              {
                name: 'Órdenes',
                data:
                  orderData.length > 0
                    ? orderData.map((d) => d.value)
                    : [5, 7, 3, 9, 6, 4, 8],
              },
            ]}
          />

          <LineChart
            title="Clientes vs Direcciones"
            labels={['Clientes', 'Direcciones']}
            series={[
              {
                name: 'Clientes',
                data: [customerData > 0 ? customerData : 30],
              },
              {
                name: 'Direcciones',
                data: [addressData > 0 ? addressData : 50],
              },
            ]}
          />

          <LineChart
            title="Fotos e Incidencias"
            labels={['Fotos', 'Issues']}
            series={[
              {
                name: 'Fotos',
                data: [photoData > 0 ? photoData : 25],
              },
              {
                name: 'Issues',
                data: [issueData > 0 ? issueData : 12],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Graficas;
