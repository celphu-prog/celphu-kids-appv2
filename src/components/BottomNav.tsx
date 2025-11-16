
import React from 'react';
import type { Screen } from '../types';

interface BottomNavProps {
    activeScreen: Screen;
    setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    const activeClasses = 'text-teal-600';
    const inactiveClasses = 'text-gray-500 hover:text-teal-500';

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center px-4 z-50">
            <NavItem
                label="Reto Diario"
                icon="🌟"
                isActive={activeScreen === 'main'}
                onClick={() => setActiveScreen('main')}
            />
            <NavItem
                label="Herramientas"
                icon="🧰"
                isActive={activeScreen === 'toolbox'}
                onClick={() => setActiveScreen('toolbox')}
            />
            <NavItem
                label="El Método"
                icon="🎓"
                isActive={activeScreen === 'method'}
                onClick={() => setActiveScreen('method')}
            />
        </nav>
    );
};