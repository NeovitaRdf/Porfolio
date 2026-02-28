import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { mockUser } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">RDF</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Dr. Rocco de Filippis</div>
                <div className="text-gray-400 text-xs">Psychiatrist & Neuroscientist</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Over 20 years of expertise in clinical practice, research, and academic excellence. 
              Specializing in mood disorders, forensic psychiatry, and innovative mental health solutions.
            </p>
            <div className="flex space-x-4">
              <a href={mockUser.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-gray-900 hover:bg-red-900 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href={`mailto:${mockUser.email}`}
                 className="w-10 h-10 bg-gray-900 hover:bg-red-900 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Mail className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-red-500 text-sm transition-colors">About</Link></li>
              <li><Link to="/publications" className="text-gray-400 hover:text-red-500 text-sm transition-colors">Publications</Link></li>
              <li><Link to="/experience" className="text-gray-400 hover:text-red-500 text-sm transition-colors">Experience</Link></li>
              <li><Link to="/certifications" className="text-gray-400 hover:text-red-500 text-sm transition-colors">Certifications</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-red-500 text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-red-500" />
                <span>{mockUser.phone}</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-red-500" />
                <span>{mockUser.email}</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-red-500" />
                <span>{mockUser.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Dr. Rocco de Filippis. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-red-500 text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-red-500 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;