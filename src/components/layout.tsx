/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { type PropsWithChildren, useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import useHandleLogIn from "~/hooks/useLogIn";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
};

const Navbar = () => {
  const links = [
    { href: "/", name: "Dashboard" },
    { href: "/days", name: "Days" },
    { href: "/reviews", name: "Reviews" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  useHandleLogIn();
  // const { mutate: createUser } = api.user.create.useMutation();

  // useEffect(() => {
  //   if (user.user) {
  //     createUser({
  //       first_name: user.user.firstName,
  //       last_name: user.user.lastName,
  //       avatar_url: user.user.imageUrl,
  //     });
  //   }
  // }, []);

  return (
    <nav className="border-b border-b-emerald-200 bg-emerald-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="auto h-8"
                src="/logo.png"
                alt="Year in Review logo"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => (
                  <NavLink key={link.href} href={link.href} name={link.name} />
                ))}
              </div>
            </div>
          </div>
          <div className="relative ml-3 hidden md:block">
            {user ? (
              <SignOutButton>
                <button className="block max-w-max rounded-md bg-white px-3 py-2 text-base font-medium">
                  Log out
                </button>
              </SignOutButton>
            ) : (
              <SignInButton>
                <button className="block max-w-max rounded-md bg-white px-3 py-2 text-base font-medium">
                  Log in
                </button>
              </SignInButton>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md bg-emerald-900 p-2 text-white hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <Menu
                aria-hidden="true"
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
              />
              <X
                aria-hidden="true"
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} name={link.name} />
          ))}
        </div>
        <div className="border-t border-emerald-700 pb-3 pt-4">
          <div className="relative mx-3">
            {user ? (
              <SignOutButton>
                <button className="block max-w-max rounded-md bg-white px-3 py-2 text-base font-medium">
                  Log out
                </button>
              </SignOutButton>
            ) : (
              <SignInButton>
                <button className="block max-w-max rounded-md bg-white px-3 py-2 text-base font-medium">
                  Log in
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  name: string;
}

const NavLink = (props: NavLinkProps) => {
  const router = useRouter();
  const { href, name } = props;
  return (
    <Link
      key={href}
      href={href}
      className={`${
        router.pathname === href
          ? "bg-emerald-900 text-white"
          : "text-emerald-900 hover:bg-emerald-700 hover:text-white"
      } block rounded-md px-3 py-2 text-base font-medium`}
      aria-current={router.pathname === href ? "page" : undefined}
    >
      {name}
    </Link>
  );
};
