
import React from 'react';

interface PremiumModalProps {
    onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all scale-100 opacity-100 animate-fade-in-up relative">
                 <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Cerrar modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-5xl mb-4">👑</div>
                <h2 className="text-2xl font-bold text-gray-800">Desbloquea el Modo Genio</h2>
                <p className="mt-2 text-gray-600">
                    Conviértete en Premium para llevar la estimulación temprana al siguiente nivel.
                </p>

                <div className="mt-6 text-left space-y-3 bg-teal-50 p-4 rounded-lg text-gray-800">
                    <p className="flex items-start"><span className="text-teal-500 mr-2">✔️</span> <strong>Actividades Más Profundas:</strong> Retos más complejos y multifacéticos.</p>
                    <p className="flex items-start"><span className="text-teal-500 mr-2">✔️</span> <strong>Explicaciones Avanzadas:</strong> Conexiones neurocientíficas detalladas y fáciles de entender.</p>
                    <p className="flex items-start"><span className="text-teal-500 mr-2">✔️</span> <strong>Generación Ilimitada:</strong> Pide tantos retos avanzados como quieras, cuando quieras.</p>
                </div>
                
                <div className="mt-8 flex flex-col space-y-3">
                    <button
                        onClick={onClose} // For now, just closes the modal
                        className="w-full bg-amber-400 text-amber-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-500 transition-transform transform hover:scale-105"
                    >
                        Pasar a Premium (Próximamente)
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full text-gray-500 font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition"
                    >
                        Quizás más tarde
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
