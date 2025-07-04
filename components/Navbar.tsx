import Link from 'next/link'
import Image from 'next/image';
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10 border-b border-gray-700">
      <Link href='/'className="flex items-center gap-1">
      <Image
          src="public/icons/logo.svg"
          width={32}
          height={32}
          alt="Saviour"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Saviour
        </p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
          </SignedIn>
      <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar