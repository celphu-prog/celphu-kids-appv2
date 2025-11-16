
import React from 'react';

export const ConversionBanner: React.FC = () => {
    return (
        <div className="sticky bottom-20 left-0 right-0 p-4 z-40">
            <div className="bg-gradient-to-r from-teal-500 to-sky-500 text-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <p className="font-bold">¿Te gusta este método? Lo aplicamos 5 horas al día.</p>
                    <p className="text-sm">Conoce Celphu Kids y potencia el genio de tu hijo.</p>
                </div>
                <a
                    href="https://celphukids.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-teal-600 font-bold py-2 px-5 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 whitespace-nowrap"
                >
                    Saber Más
                </a>
            </div>
        </div>
    );
};
