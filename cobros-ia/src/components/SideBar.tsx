'use client'

import React, { useContext, createContext, useState } from "react";
import Image from "next/image";
import { signOut, getSession } from "next-auth/react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const SidebarContext = createContext(null)

export default function SideBar({ children }) {

    const [expanded, setExpanded] = useState(true)

    const session = getSession();
    const [user, setUser] = useState("")

    session.then((res) => {
        if (res) setUser(res.user.name)
    })

    return (
        <div className={`h-screen float-left ${expanded ? "w-[20vw]" : "w-[5vw]"}`}>
            <nav className="h-full flex flex-col bg-darkbg border-r shadow-md">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Image
                        src="/logo-removebg.png"
                        width="500"
                        height="500"
                        alt="logo png"
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-lightbg hover:bg-gray-100 w-[5vw] text-brand-color">
                        {expanded ? <RiMenuUnfoldLine className="w-[5vw] m-auto" /> : <RiMenuFoldLine className="m-auto" />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <Image
                        src="https://ui-avatars.com/api/?background=00DAC6&color=A12697&bold=true"
                        width={500}
                        height={500}
                        alt="User profile picture"
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all w-full ${expanded ? "w-52 ml-3" : "invisible"}`}
                    >
                        <div className="leading-4">
                            <h4 className={`font-semibold text-brand-color`}>{user}</h4>
                        </div>

                        <CiLogout
                            className="w-10 h-10 text-brand-color hover:cursor-pointer"
                            onClick={() => signOut()}
                        />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export function SidebarItem({ icon, text, path, active, alert }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <Link href={path}>
            <li
                className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${active
                        ? "bg-gradient-to-tr from-lightbg to-brand-color text-switch-purple"
                        : "hover:bg-lightbg text-brand-color hover:text-switch-purple"
                    }`}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                        }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-switch-purple ${expanded ? "" : "top-2"
                            }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-darkbg text-brand-color text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}
