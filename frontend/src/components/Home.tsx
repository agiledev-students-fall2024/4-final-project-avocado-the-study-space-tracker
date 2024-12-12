import StoresSearchBar from "./StoresSearchBar";
import useStores from "@/hooks/useStores";
import { Loader } from "lucide-react";
import MyStoresButton from "./MyStoresButton";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import SoHoMap from "./SoHoMap";
import { useMyStores } from "@/context/StoresContext";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";

export default function Home() {
  const { stores, loading, error } = useStores();
  const { stores: userStores } = useMyStores();
  const [showOnlyUserStores, setShowOnlyUserStores] = useState(false);
  const navigate = useNavigate();

  const handleClickGenerate = () => {
    navigate("/route");
  };

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {error ? (
          <span style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
            An error occurred: {error}
          </span>
        ) : !loading ? (
          <StoresSearchBar stores={stores} />
        ) : (
          <Loader style={{ margin: "auto", marginTop: "20px", animation: "spin 1s linear infinite" }} />
        )}
        <MyStoresButton />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
        <div style={{ position: "absolute", top: "-30px", display: "flex", gap: "5px", alignItems: "center" }}>
          <Switch
            id="display"
            checked={showOnlyUserStores}
            onClick={() => setShowOnlyUserStores((prev) => !prev)}
          />
          <Label htmlFor="display" style={{ fontWeight: "300", fontSize: "14px" }}>
            Show only selected stores
          </Label>
        </div>
        <div style={{ width: "100%", height: "300px", border: "2px solid black" }}>
          {loading ? (
            <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Loader style={{ animation: "spin 1s linear infinite", width: "40px", height: "40px" }} />
            </div>
          ) : error ? (
            <div>Something went wrong when loading the map: {error}</div>
          ) : (
            <SoHoMap
              key={showOnlyUserStores.toString()}
              stores={showOnlyUserStores ? userStores : stores}
              showOnlyUserStores={showOnlyUserStores}
            />
          )}
        </div>
        <Button
          style={{ borderRadius: "24px", height: "48px", fontWeight: "800", fontSize: "18px" }}
          onClick={() => navigate("/suggest")}
        >
          Suggest Stores For Me
        </Button>
        <Button
          style={{ borderRadius: "24px", height: "48px", fontWeight: "800", fontSize: "18px" }}
          onClick={() => navigate("/saved-routes")}
        >
          Saved Routes
        </Button>
        <Button
          style={{ borderRadius: "24px", height: "48px", fontWeight: "800", fontSize: "18px" }}
          onClick={handleClickGenerate}
          disabled={userStores.length === 0}
        >
          Generate Route
        </Button>
      </div>
    </main>
  );
}
