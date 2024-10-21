import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSuggestPage = location.pathname === "/suggest";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-1/3">
          {isSuggestPage && (
            <Button
              variant={"secondary"} onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          )}

        </div>

        <div className="w-1/3 flex justify-center">
          <div className="text-white text-2xl font-bold">LOGO</div>
        </div>

        <div className="w-1/3 flex justify-end">
          <Button
            variant={"destructive"}
            onClick={() => console.log("logging out")}
          >
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
