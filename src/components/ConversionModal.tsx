
import React from 'react';

interface ConversionModalProps {
    onClose: () => void;
}

export const ConversionModal: React.FC<ConversionModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all scale-100 opacity-100 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-teal-600">¡Felicidades!</h2>
                <p className="mt-2 text-gray-700">Has completado 5 días activando la genialidad de tu hijo.</p>
                <p className="mt-4 text-gray-600 bg-teal-50 p-3 rounded-lg">
                    Lo que haces en 5 minutos en casa, es la base de nuestro método educativo. En Celphu Kids, hemos perfeccionado esto durante 30 años.
                </p>
                <p className="mt-4 font-semibold text-gray-800">
                    Esta ventana de 16 a 30 meses es la más importante. ¡Tenemos solo 24 cupos para este ciclo!
                </p>
                <div className="mt-8 flex flex-col space-y-3">
                    <a
                        href="https://celphukids.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-amber-400 text-amber-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-500 transition-transform transform hover:scale-105"
                    >
                        Agendar una Visita (Últimos Cupos)
                    </a>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full hover:bg-gray-300 transition"
                    >
                        Seguir usando la app gratis
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
