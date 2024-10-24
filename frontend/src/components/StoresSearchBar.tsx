import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Comment out or remove the problematic import
// import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Store } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import SearchStoreItem from "./SearchStoreItem";

function StoreList({ suggestedStores = [], stores = [] }: { suggestedStores: Store[]; stores: Store[] }) {
  return (
    <Command>
      <CommandInput placeholder="Search stores..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {suggestedStores.length > 0 && (
          <CommandGroup heading="Suggested Stores">
            {suggestedStores.map((store) => (
              <SearchStoreItem key={store._id} store={store} />
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading="All Stores">
          {stores.map((store) => (
            <SearchStoreItem key={store._id} store={store} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default function StoreSearchBar({ stores = [] }: { stores: Store[] }) {
  const [open, setOpen] = useState(false);
  const [suggestedStores, setSuggestedStores] = useState<Store[]>([]);
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const openSearchBar = location.state?.openSearchBar || false;
    const newSuggestedStores = location.state?.suggestedStores || [];

    if (openSearchBar) {
      setOpen(true);
      setSuggestedStores(newSuggestedStores);
      // Clear the state after opening the search bar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between w-60 m-auto mt-10")}
          >
            Search Stores
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          {isDesktop ? (
            <StoreList stores={stores} suggestedStores={suggestedStores} />
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerContent>
                <div className="mt-4 border-t">
                  <StoreList stores={stores} suggestedStores={suggestedStores} />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
