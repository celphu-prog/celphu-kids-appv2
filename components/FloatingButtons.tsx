
import React from 'react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg fill="currentColor" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.61 15.35 3.48 16.81L2 22L7.33 20.55C8.75 21.35 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.24 20.93 6.78 19.05 4.9C17.17 3.02 14.71 2 12.04 2ZM12.04 20.14C10.56 20.14 9.13 19.7 7.91 18.91L7.53 18.68L4.3 19.54L5.18 16.41L4.93 16.02C4.08 14.68 3.61 13.14 3.61 11.91C3.61 7.33 7.41 3.54 12.04 3.54C14.28 3.54 16.33 4.41 17.89 5.97C19.45 7.53 20.32 9.58 20.32 11.91C20.32 16.5 16.67 20.14 12.04 20.14ZM16.56 14.45C16.31 14.32 15.12 13.75 14.89 13.67C14.66 13.58 14.5 13.54 14.34 13.77C14.18 14 13.71 14.56 13.57 14.72C13.43 14.88 13.29 14.9 13.04 14.77C12.79 14.65 11.91 14.34 10.87 13.4C10.06 12.66 9.53 11.78 9.39 11.55C9.25 11.32 9.38 11.19 9.5 11.07C9.61 10.96 9.75 10.78 9.89 10.62C10.01 10.48 10.06 10.36 10.14 10.2C10.23 10.04 10.18 9.89 10.1 9.77C10.02 9.65 9.55 8.46 9.36 7.99C9.17 7.52 8.98 7.59 8.85 7.58H8.5C8.34 7.58 8.1 7.62 7.89 7.85C7.68 8.08 7.12 8.59 7.12 9.73C7.12 10.87 7.91 11.98 8.05 12.14C8.19 12.3 9.57 14.49 11.59 15.29C13.62 16.1 14.34 15.77 14.81 15.73C15.28 15.68 16.31 15.12 16.52 14.89C16.73 14.66 16.73 14.53 16.68 14.45H16.56Z"></path>
    </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg fill="url(#instagram-gradient)" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="instagram-gradient" cx="0.3" cy="1" r="1">
                <stop offset="0%" stopColor="#FEDA75" />
                <stop offset="25%" stopColor="#FA7E1E" />
                <stop offset="50%" stopColor="#D62976" />
                <stop offset="75%" stopColor="#962FBF" />
                <stop offset="100%" stopColor="#4F5BD5" />
            </radialGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.646C8.74 0.517 8.354 0.5 4.85 0.5 1.654 0.5 0.5 1.654 0.5 4.85c0 3.504.017 3.89.07 4.85.149 3.225 1.664 4.771 4.919 4.919 0.96.053 1.343.07 4.85.07 3.507 0 3.89-.017 4.85-.07 3.252-.148 4.771-1.691 4.919-4.919.053-.96.07-1.343.07-4.85 0-3.196-1.154-4.35-4.35-4.35C15.89 0.517 15.504 0.5 12 0.5h0Zm0 4.865A5.135 5.135 0 1 0 12 15.135 5.135 5.135 0 0 0 12 6.511Zm0 8.468A3.333 3.333 0 1 1 12 8.311a3.333 3.333 0 0 1 0 6.666Zm6.406-9.696a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"></path>
    </svg>
);


export const FloatingButtons: React.FC = () => {
    return (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col space-y-3">
             <a 
                href="https://wa.me/3018065606"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
             >
                <WhatsAppIcon className="w-8 h-8 text-white" />
            </a>
            <a 
                href="https://www.instagram.com/celphu_kids?igsh=cW5pY3A0MTM4ajk3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram"
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 p-2"
            >
                <InstagramIcon className="w-full h-full" />
            </a>
        </div>
    );
};
