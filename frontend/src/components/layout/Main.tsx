import { Outlet } from "react-router";

export default function Main() {
  return (
    <main className="w-full p-8 mb-64">
      <div className="w-full flex justify-center">
        <Outlet />
      </div>
    </main>
  )
}
