'use client'
import { Poppins } from 'next/font/google'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/Pages/Qrcode' },
  { name: 'Docs', href: '/Pages/Docs' },
  { name: 'Contact', href: '/Pages/Contact' },
]

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: ["600"],
})

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-transparent backdrop-blur-sm border-b text-black fixed z-20 w-full">
      <header className="inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 ">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
             <h1 className={`${PoppinsFont.className} font-bold text-xl`}>SocialQR</h1>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm/6 font-semibold hover:text-blue-600 active:text-blue-600">
                {item.name}
              </Link>
            ))}

          </div>
         
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-transparent backdrop-blur-md text-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
            <div className="flex items-center justify-between border-b pb-6">
              <Link href="/" className="-m-1.5 p-1.5">
               <h1 className={`${PoppinsFont.className} font-bold text-xl`}>SocialQR</h1>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6 "/>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:text-blue-600 active:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
               
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

     
    </div>
  )
}

// bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]">