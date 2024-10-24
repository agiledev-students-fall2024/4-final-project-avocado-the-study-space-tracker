import type { Store } from "@/types";
import { useState } from "react";
import { CommandItem } from "./ui/command";
import { Button } from "./ui/button";
import { Plus, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { PriceRange } from "@/types";
import { useMyStores } from "@/context/StoresContext";

const priceRangeToDollarIcons: Record<PriceRange, number> = {
  Budget: 1,
  "Mid-Range": 2,
  Premium: 3,
  Luxury: 5,
};

export default function SearchStoreItem({ store }: { store: Store }) {
  const { addStore, removeStore, hasStore } = useMyStores();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addStore(store);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <CommandItem className="h-[100px] flex justify-between px-5">
            <div className="text-2xl font-extrabold">{store.name}</div>

            {isAdding ? (
              <Check className="text-green-500 w-[86px] animate-ping" />
            ) : hasStore(store._id) ? (
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeStore(store._id);
                }}
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="add"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd();
                }}
              >
                Add <Plus className="ml-1" />
              </Button>
            )}
          </CommandItem>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">{store.name}</DialogTitle>
          <DialogDescription>{store.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <img
            alt="store picture"
            className="object-contain"
            src={store.image}
          />
          <div>
            <span className="text-lg font-semibold">Price Range:</span>{" "}
            <span
              className={`${store.priceRange === "Budget" ? "text-green-500" : store.priceRange === "Mid-Range" ? "text-slate-400" : store.priceRange === "Luxury" ? "text-red-500" : "text-red-700"} font-bold text-lg`}
            >
              {store.priceRange}{" "}
              <span className=" text-base">
                (
                {"$".repeat(
                  priceRangeToDollarIcons[store.priceRange as PriceRange],
                )}
                )
              </span>
            </span>
          </div>
          <div>
            <span className="text-lg font-semibold">Category:</span>{" "}
            <span className={`font-bold text-lg`}>{store.category}</span>
          </div>
          <div>
            <span className="text-lg font-semibold">Brand:</span>{" "}
            <span className={`font-bold text-lg`}>{store.brand}</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
