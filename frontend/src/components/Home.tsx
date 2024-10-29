import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import StoreSearchBar from "./StoresSearchBar";
import MyStoresButton from "./MyStoresButton";
import sampleStores from "@/stores";
import SoHoMap from "./SoHoMap";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-10 px-5">
      <div className="flex flex-col gap-5">
        <StoreSearchBar stores={sampleStores} />
        <MyStoresButton />
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full h-[300px] border-2 border-black">
          <SoHoMap />
        </div>
        <Button
          className="rounded-3xl h-12 font-extrabold text-lg"
          onClick={() => navigate("/suggest")}
        >
          Suggest Stores For Me
        </Button>
        <Button
          className="rounded-3xl bg-red-400 hover:bg-red-600 border-red-500 h-12 font-extrabold text-lg text-white"
          onClick={() => navigate("/help")}
        >
          Help
        </Button>
      </div>
    </main>
  );
}
