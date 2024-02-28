"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import _ from "lodash";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { allPaths } from "@/lib/parser";
import { ScrollArea } from "./ui/scroll-area";
export function Options() {
  const pathName = usePathname().slice(1);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" relative flex items-center gap-2 bg-popover text-lg rounded-md font-semibold text-foreground px-4 py-2">
          <span>{_.capitalize(pathName)}</span>
          <ChevronDown width={25} height={25} className=" font-extrabold" />
          <div className=" absolute w-full h-full bg-transparent border-white border-2 -left-1 -bottom-1 rounded-md -z-40"></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mx-2 p-0">
        <ScrollArea className=" max-w-80 h-80">
          {Object.keys(allPaths)
            .filter((k) => k !== pathName)
            .map((k) => (
              <div>
                <DropdownMenuItem key={k}>
                  <OptionBtn name={k} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OptionBtn({ name }: { name: string }) {
  const router = useRouter();
  const handler = () => {
    router.push(`/${name}`);
  };
  return (
    <button
      onClick={handler}
      className=" w-full relative flex items-center gap-2 bg-popover rounded-md font-semibold text-foreground px-4 py-2"
    >
      {_.capitalize(name)}
    </button>
  );
}
