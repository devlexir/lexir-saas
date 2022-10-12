import { RestrictAccessMini } from "@assets/access-denied/mini_restrict_access_svg";
import { RestrictAccess } from "@assets/access-denied/restrict_access_svg";
import { Retangle } from "@assets/change-password-first-login/retangle_svg";
import Button from "@components/ui/button";
import Logo from "@components/ui/logo";
import Link from "next/link";

const AccessDeniedPage = () => {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-10">
        <Logo />
      </div>

      <div className="flex h-screen w-full">
        <div className="z-30 hidden w-full justify-center px-10 py-8 md:flex">
          <div className="flex w-full max-w-md flex-col justify-center ">
            <h2 className="mb-10 mt-4 text-4xl font-bold text-[#4F4F4F]">
              We are sorry...
            </h2>
            <span className="mb-10 max-w-sm text-xl text-[#4F4F4F]">
              This page have restrict access
            </span>
            <span className="mb-20  text-2xl font-bold text-[#4F4F4F]">
              Get in touch with the site owner
            </span>
            <Button className="h-12 w-full">
              <Link href="/">BACK TO HOMEPAGE</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden w-full md:flex md:h-full">
          <RestrictAccess className="absolute inset-x-0 bottom-1/4	z-40 w-80 lg:w-96" />
          <Retangle className="absolute top-10 right-0 2xl:w-[1024px]" />
        </div>

        <div className="flex w-full justify-center px-5 py-8 shadow-lg md:hidden">
          <div className="flex w-full max-w-md flex-col justify-center">
            <h2 className="mb-10 mt-4 text-3xl font-bold text-[#4F4F4F]">
              We are sorry...
            </h2>
            <span className="mb-10 max-w-xs text-base text-[#4F4F4F]">
              This page have restrict access
            </span>
            <span className="mb-20  text-2xl font-bold text-[#4F4F4F]">
              Get in touch with the site owner
            </span>
            <div className="relative mb-20 flex w-full justify-center">
              <RestrictAccessMini className="z-40 h-44 w-60 " />
              <Retangle className="absolute -top-10 -right-5 -z-10 h-52 w-72 overflow-hidden" />
            </div>
            <Button className="h-12 w-full">
              <Link href="/">BACK TO HOMEPAGE</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessDeniedPage;
