"use client";

import { siteNavConfigWithSession } from "@/config/site";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {siteNavConfigWithSession.navMenuItems.map((link) => {
          const isActive =
            (pathname.includes(link.href) && link.href.length > 1) ||
            pathname === link.href;
          if (link.label === "Sair") {
            return (
              <a
                key={link.label}
                className="bottombar_link cursor-pointer"
                onClick={handleSignOut}
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
              </a>
            );
          }

          return (
            <Link
              href={link.href}
              key={link.label}
              className={`bottombar_link ${
                isActive && "bg-[#17f7a929] bg-opacity-50"
              }`}
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
