"use client";

import { siteNavConfigWithSession } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {siteNavConfigWithSession.navMenuItems.map((link) => {
          const isActive =
            (pathname.includes(link.href) && link.href.length > 1) ||
            pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-[#d627d0] bg-opacity-50"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
