import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 mt-10">
 
      <div className="px-4 py-8 space-y-6">

        
        <div>
          <h2 className="text-lg font-bold text-yellow-400">
            OneGram Gold Fancy
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Premium One Gram Gold & Panchalohalu Ornaments
          </p>
        </div>


       
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Contact Us
          </h3>
          <p className="text-sm text-gray-400">
            Andhrapradesh
          </p>
          <p className="text-sm text-gray-400">
            📞 +91 9XXXXXXXXX
          </p>
          <p className="text-sm text-gray-400">
            ✉️ support@onegramgold.com
          </p>
        </div>

      </div>

      
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} OneGram Gold Fancy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
