import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4 md:px-10 lg:px-20">
        {/* Contact Information */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p>Phone: +91 9328599843</p>
          <p>Email: dhruvpatel372004@gmail.com</p>
        </div>

        {/* Social Media Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex space-x-4 cursor-pointer">
            <a className="hover:text-blue-500">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a className="hover:text-blue-400">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a className="hover:text-pink-500">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a className="hover:text-blue-600">
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className=" my-4 border-b-2 border-dashed border-gray-300 pb-4"></div>
      <p className="flex justify-center">
        © 2024 Intertwine. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
