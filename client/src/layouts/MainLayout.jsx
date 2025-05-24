import { Outlet } from "react-router";

export default function MainLayout({ children }) {
  return (
    <div>
      <h2>Основной лэйаут</h2>
      <Outlet />
    </div>
  );
}
