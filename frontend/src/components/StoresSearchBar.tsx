import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Search } from "lucide-react";
import { Store } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import StoreItem from "./StoreItem";
import { Separator } from "./ui/separator";

function StoreList({
  stores,
  highlightedStores = [],
  heading = undefined,
}: {
  stores: Store[];
  highlightedStores?: Store[];
  heading?: string | undefined;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search stores..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {highlightedStores.length > 0 && (
          <CommandGroup heading={heading}>
            {highlightedStores.map((store) => (
              <CommandList key={store._id}>
                <StoreItem type="search" store={store} />
              </CommandList>
            ))}
            <Separator
              style={{
                height: "5px",
                backgroundColor: "#ddd",
                margin: "8px 0",
              }}
            />
          </CommandGroup>
        )}
        <CommandGroup heading="All Stores">
          {stores.map((store) => (
            <CommandList key={store._id}>
              <StoreItem type="search" store={store} />
            </CommandList>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default function StoresSearchBar({ stores = [] }: { stores: Store[] }) {
  const [open, setOpen] = useState(false);
  const [suggestedStores, setSuggestedStores] = useState<Store[]>([]);
  const isDesktop =
    typeof window !== "undefined" ? window.innerWidth >= 768 : true;
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
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "240px",
              margin: "32px auto 0",
              padding: "8px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            Search Stores
            <Search
              style={{
                marginLeft: "8px",
                height: "16px",
                width: "16px",
                flexShrink: 0,
                opacity: 0.5,
              }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            width: "200px",
            padding: "0",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          {isDesktop ? (
            <StoreList
              stores={stores}
              highlightedStores={suggestedStores}
              heading="Suggested Stores"
            />
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerContent>
                <div
                  style={{
                    marginTop: "16px",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <StoreList
                    stores={stores}
                    highlightedStores={suggestedStores}
                    heading="Suggested Stores"
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
