"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { capitalize } from "@/util/text";
import { useWidth } from "@/hooks/useWidth";
import { X } from "lucide-react";
import { useNavStore } from "@/store/navStore";
import Link from "next/link";

export const SideBar = () => {
  const width = useWidth();

  const pathname = usePathname();
  const cleanPath = pathname.split("/").slice(2);
  const dashbboardItem = cleanPath[0];
  const dashboardItemLast = cleanPath[cleanPath.length - 1];
  const dashboardItemMiddle = cleanPath[1];

  const overviewItems = ["app"];
  const managementItems = [{ user: ["list", "account", "create", "edit"] }];
  const sideBarOpen = useNavStore((state) => state.sideOpen);
  const closeSideBar = useNavStore((state) => state.closeSide);

  return (
    <>
      {width < 700 && sideBarOpen && (
        <div
          className="absolute bg-black h-[100vh] w-[100vw] left-0 top-0 z-20 opacity-20 cursor-pointer"
          onClick={closeSideBar}
        ></div>
      )}
      <div
        className={`w-1/4 min-w-[200px] h-[100vh] px-4 border-l-[1px] border-slate-300 border ${
          width < 700 &&
          `absolute left-0 top-0 bg-white z-30 transition-transform duration-300 ${
            !sideBarOpen && "translate-x-[-300px]"
          }`
        }`}
      >
        <div
          className={`h-[7vh] flex items-center justify-start ${
            width < 700 && "justify-between"
          }`}
        >
          <Link href="/dashboard/" className="font-bold text-2xl ">
            Dashboard
          </Link>
          {width < 700 && (
            <X className="cursor-pointer" onClick={closeSideBar} />
          )}
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={dashbboardItem || "overview"}
        >
          <AccordionItem value="overview">
            <AccordionTrigger
              className={`font-medium text-gray-400 hover:text-black py-2 px-0 ${
                !dashbboardItem && "text-black"
              }`}
              configureChevron={true}
              chevron={false}
            >
              Overview
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {overviewItems.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`${
                      item === "app" ? "/dashboard" : `/dashboard/${item}`
                    }`}
                  >
                    <Button
                      className={`justify-start w-full ${
                        dashbboardItem === "dashboard" &&
                        item === "app" &&
                        "bg-slate-100"
                      }`}
                      variant={"ghost"}
                    >
                      {capitalize(item)}
                    </Button>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="management">
            <AccordionTrigger
              className={`font-medium text-gray-400 hover:text-black py-2 px-0  ${
                dashbboardItem === "management" && "text-black"
              }`}
              configureChevron={true}
              chevron={false}
            >
              Management
            </AccordionTrigger>
            <AccordionContent>
              {managementItems.map((item, index) => {
                const itemName = Object.keys(item)[0];
                const itemContent = Object.entries(item)[0][1];
                return (
                  <Accordion
                    type="single"
                    collapsible
                    key={index}
                    defaultValue={dashboardItemMiddle}
                  >
                    <AccordionItem value={itemName}>
                      <AccordionTrigger
                        className={`hover:bg-slate-100 mb-2 ${
                          dashboardItemMiddle === itemName && "bg-slate-100"
                        }`}
                      >
                        {capitalize(itemName)}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
                        {itemContent.map((item, index) => {
                          return (
                            <Link
                              key={index}
                              href={`/dashboard/management/${itemName}/${item}`}
                            >
                              <Button
                                className={`justify-start w-full ${
                                  item === dashboardItemLast && "bg-slate-100"
                                }`}
                                variant={"ghost"}
                              >
                                {capitalize(item)}
                              </Button>
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
