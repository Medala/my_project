import Navbar from "@components/Navbar"
import LeftPanel from "@components/left-panel"
import React, { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import { FaStar } from "react-icons/fa6"
import { FaStarHalfStroke } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa"

interface Props {
  children: ReactNode
}

const CustomerLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar></Navbar>

      <div className="w-full min-h-screen white">{children}</div>
      {/* footer section */}
      <div className=" w-full bg-gray-900  mt-20 pb-10 hidden md:block">
        <div className="w-full bg-gray-900 h-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4">
            <span className="text-gray-300 font-semibold text-2xl">
              Sarah Power Tools Mizoram
            </span>
            <div className="flex space-x-1 text-gray-200 items-center  ">
              <span>4.6</span>
              <span className="flex">
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStarHalfStroke color="gold" />
              </span>
              <span>Google reviews</span>
            </div>

            <div className="text-gray-200">
              <span> Address:</span>

              <span>
                Saron veng, Bethlehem Road, near Govt.Middle School, Aizawl,
                Mizoram 796001
              </span>
            </div>
          </div>

          {/* contact us section */}
          <div className="flex justify-center">
            <div className="">
              <div className="text-gray-200">
                <span className="font-semibold text-gray-200">
                  {" "}
                  Contact Us:
                </span>
              </div>
              <div className="mt-2">
                <div className="">
                  <a
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/9383073699"
                  >
                    <img
                      alt="Chat on WhatsApp"
                      src="/src/assets/ChatOnWhatsAppButton/WhatsAppButtonGreenSmall.svg"
                    />
                  </a>
                </div>
                {/* <button className="rounded-full flex items-center bg-white px-4 py-1 hover cursor-pointer shadow-white hover:shadow-lg">
                <FaWhatsapp className="text-green-400" size={40} />
                <span className="pl-2 text-green-400 font-semibold">
                  Chat on Whatsapp
                </span>
              </button> */}
              </div>
            </div>
          </div>

          <div className="bg-gray-200">
            <iframe
              className="h-80 w-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1873.732448117047!2d92.71944936290551!3d23.733246451343312!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374d952c488facbd%3A0x5bb82d20f4b97c2e!2sSARAH%20POWER%20TOOLS!5e1!3m2!1sen!2sin!4v1731567423835!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* mobile footer */}
      <div className=" w-full bg-gray-900  mt-20 pb-40  md:hidden">
        <div className="w-full bg-gray-900 h-4"></div>
        <div className="h-auto">
          <div className="p-4 bg-indigo-600 h-min">
            <span className="text-gray-300 font-semibold text-2xl">
              Sarah Power Tools Mizoram
            </span>
            <div className="flex space-x-1 text-gray-200 items-center  ">
              <span>4.6</span>
              <span className="flex">
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStarHalfStroke color="gold" />
              </span>
              <span>Google reviews</span>
            </div>

            <div className="text-gray-200">
              <span> Address:</span>

              <span>
                Saron veng, Bethlehem Road, near Govt.Middle School, Aizawl,
                Mizoram 796001
              </span>
            </div>
          </div>

          {/* contact us section */}
          <div className="flex justify-center  p-8 h-min">
            <div className="">
              <div className="text-gray-200">
                <span className="font-semibold text-gray-200">
                  {" "}
                  Contact Us:
                </span>
              </div>
              <div className="mt-2">
                <div className="">
                  <a
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/9383073699"
                  >
                    <img
                      alt="Chat on WhatsApp"
                      src="/src/assets/ChatOnWhatsAppButton/WhatsAppButtonGreenSmall.svg"
                    />
                  </a>
                </div>
                {/* <button className="rounded-full flex items-center bg-white px-4 py-1 hover cursor-pointer shadow-white hover:shadow-lg">
                <FaWhatsapp className="text-green-400" size={40} />
                <span className="pl-2 text-green-400 font-semibold">
                  Chat on Whatsapp
                </span>
              </button> */}
              </div>
            </div>
          </div>
          <div className="text-gray-200 px-2">
            <span className="font-semibold text-gray-200">Map:</span>
          </div>
          <div className=" h-min">
            <iframe
              className="h-80 w-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1873.732448117047!2d92.71944936290551!3d23.733246451343312!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374d952c488facbd%3A0x5bb82d20f4b97c2e!2sSARAH%20POWER%20TOOLS!5e1!3m2!1sen!2sin!4v1731567423835!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      {/* end of mobile footer */}
      {/* footer section */}
      <Toaster />
    </>
  )
}

export default CustomerLayout
