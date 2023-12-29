'use client'

import SideBar, { SidebarItem } from "@/components/SideBar"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHome, CiShop, CiMail } from "react-icons/ci";


export default function DashboardLayout({ children }) {
    // Vars
    const [selectedTab, setSelectedTab] = useState("home")
    const pathname = usePathname().split('/')

    useEffect(() => {
        setSelectedTab(pathname[pathname.length-1])
    })

    return (
        <>
        <div className="w-full h-screen bg-lightbg">
            <SideBar>
                <SidebarItem
                    icon={<CiHome size={20} />}
                    text={"Menú"}
                    path={"/dashboard/home"}
                    active={selectedTab.includes("home") ? true : false}
                    alert={false}
                />
                <SidebarItem
                    icon={<CiShop size={20} />}
                    text={"Clientes"}
                    path={"/dashboard/clients"}
                    active={selectedTab.includes("clients") ? true : false}
                    alert={false}
                />
                <SidebarItem
                    icon={<CiMail size={20} />}
                    text={"Comunicación"}
                    path={"/dashboard/messages"}
                    active={selectedTab.includes("messages") ? true : false}
                    alert={false}
                />
            </SideBar>
            <div className="h-screen overflow-x-auto">
                {children}
            </div>
        </div>
        </>
    )
}