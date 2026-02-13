import React from "react";
import Businesslogo from "../Assets/logob.png";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 mt-10">
 
      <div className="px-4 py-8 space-y-6">

        
        <div>
           <div className="flex items-center">
            <img src={Businesslogo} alt="Logo" className="h-10 w-10 object-contain rounded-full" />
           <h1 className="ml-2 text-lg font-semibold bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] bg-clip-text text-transparent">
              ONE GRAM Gold
            </h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Premium One Gram Gold & Panchalohalu Ornaments
          </p>
        </div>       
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Contact Us
          </h3>
          <p className="text-sm text-gray-400">
            Andhrapradesh, near lalitha jewellers,Amalapuram ,533201
          </p>
          <p className="text-sm text-gray-400">
            📞 +91 9160283328 || 8463989789
          </p>
          <p className="text-sm text-gray-400">
            ✉️ bhavyasrikasireddy234@gmail.com
          </p>
        </div>

      </div>

      
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
  © {new Date().getFullYear()} All rights reserved amalapuram ammayi sri OneGram Gold Fancy. 
  Powered by{" "}
  <a
    href={`https://wa.me/917842802368?text=${encodeURIComponent(
      "Hi Volna Technologies, we need a website for our business."
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#B08A2E] hover:underline"
  >
    Volna Technologies
  </a>
</div>

    </footer>
  );
};

export default Footer;
