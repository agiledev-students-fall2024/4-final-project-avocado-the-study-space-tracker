import HelpButton from "./HelpButton";
import { Button } from "./ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "@/context/AuthContext";

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isSuggestPage = location.pathname === "/suggest";
  const isHelpPage = location.pathname === "/help";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "#1f2937",
        padding: "16px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "33%" }}>
          {isSuggestPage || isHelpPage ? (
            <Button
              variant={"secondary"}
              onClick={() => navigate("/")}
              style={{
                borderColor: "#cbd5e1",
                padding: "8px 16px",
                backgroundColor: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </Button>
          ) : (
            <HelpButton />
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Link to={"/"}>
            <img src="/vite.svg" alt="Logo" style={{ height: "24px" }} />
          </Link>
        </div>

        {!isAuthPage && (
          <div
            style={{
              width: "33%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant={isAuthenticated ? "destructive" : "default"}
              onClick={handleAuthClick}
              style={{
                padding: "8px 16px",
                backgroundColor: isAuthenticated ? "#ef4444" : "#1f2937",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isAuthenticated ? "Log Out" : "Sign In"}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
