import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white px-10 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Left Block */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src='/logo.jpeg' className='h-30 w-32 object-contain rounded-full'/>
            <span className="text-lg font-bold">SGS</span>
          </div>
          <p className="mb-4 max-w-xs">
            Empowering physicians with advanced multi-modal tools to improve treatment selection and patient outcomes.
          </p>
          <div className="flex gap-4 text-white text-lg">
            <FontAwesomeIcon icon={faXTwitter} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <button className="mt-6 border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-[#0F3B36] transition">
            ↑ Back to Top
          </button>
        </div>

        {/* Site Map */}
        <div>
          <h3 className="font-semibold mb-2">Site Map</h3>
          <ul className="space-y-1 text-sm">
            <li>Homepage</li>
            <li>Technology</li>
            <li>Ataraxis Breast</li>
            <li>Resources & news</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Portal</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Services</li>
            <li>Lawyer’s Corners</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center font-bold  text-lg text-yellow-500 border-t border-yellow-500 pt-4">
        Copyright © 2024, ataraxis.ai. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
