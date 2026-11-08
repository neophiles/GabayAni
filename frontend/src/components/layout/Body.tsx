import Main from "./Main";
import Sidebar from "./Sidebar";

export default function Body() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  )
}
