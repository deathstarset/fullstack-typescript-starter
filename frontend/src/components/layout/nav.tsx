"use client";

import { useNavStore } from "@/store/navStore";
import { Icon } from "../ui/icon";
import { UserAvatar } from "../user/avatar";
import { Settings, Bell, Search, Menu } from "lucide-react";
import React from "react";
import { useWidth } from "@/hooks/useWidth";

export const Nav = () => {
  const openSideBar = useNavStore((state) => state.openSide);
  const width = useWidth();
  return (
    <div className="h-[7vh] flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {width < 700 && (
          <Icon>
            <Menu onClick={openSideBar} />
          </Icon>
        )}
        <Icon>
          <Search />
        </Icon>
      </div>
      <div className="flex items-center gap-2">
        <Icon>
          <Bell />
        </Icon>
        <Icon>
          <Settings />
        </Icon>
        <UserAvatar />
      </div>
    </div>
  );
};
