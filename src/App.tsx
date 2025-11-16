
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getDailyActivity } from './services/geminiService';
import type { Activity, AgeGroup, Screen, StoredActivity, Article, ActivityCategory } from './types';
import { AGE_GROUPS, ARTICLES, AUDIO_STIMULI } from './constants';
import { CelphuLogo } from './components/CelphuLogo';
import { Loader } from './components/Loader';
import { ActivityCard } from './components/ActivityCard';
import { BottomNav } from './components/BottomNav';
import { ConversionBanner } from './components/ConversionBanner';
import { ConversionModal } from './components/ConversionModal';
import { FloatingButtons } from './components/FloatingButtons';
import { PremiumModal } from './components/PremiumModal';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Welcome Screen Component
const WelcomeScreen: React.FC<{ onSelectAge: (age: AgeGroup) => void }> = ({ onSelectAge }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50 p-4 text-center">
        <CelphuLogo className="h-20 w-auto" />
        <p className="text-lg text-teal-800 italic mt-2">"Donde la Curiosidad se Convierte en Genialidad"</p>
        <div className="mt-12 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Para darte las ideas correctas, ¿qué edad tiene tu hijo?</h2>
            <div className="flex flex-col space-y-4">
                {AGE_GROUPS.map(age => (
                    <button
                        key={age}
                        onClick={() => onSelectAge(age)}
                        className="w-full bg-white text-teal-600 font-bold py-4 px-6 rounded-xl shadow-md border-2 border-transparent hover:border-teal-500 hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        {age}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// Main Screen Component (Daily Challenge)
const MainScreen: React.FC<{ 
    activity: Activity | null; 
    ageGroup: AgeGroup;
    isLoading: boolean;
    error: string | null;
    onUnlockGenius: () => void;
    onChangeAge: () => void;
}> = ({ activity, ageGroup, isLoading, error, onUnlockGenius, onChangeAge }) => (
    <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">El Reto de Genialidad</h1>
        <div className="flex justify-center items-center gap-2 mb-6">
             <p className="text-gray-500">Actividad del día para <strong>{ageGroup}</strong></p>
             <button
                onClick={onChangeAge}
                className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                aria-label="Cambiar la edad seleccionada"
            >
                (Cambiar)
            </button>
        </div>
        {isLoading && !activity && <Loader message="Buscando una nueva idea brillante..." />}
        {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
        {activity && <ActivityCard activity={activity} />}
        <div className="mt-6 text-center">
             <button
                onClick={onUnlockGenius}
                className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center mx-auto"
            >
                <span className="mr-2 text-xl">👑</span>
                Desbloquear Modo Genio
            </button>
        </div>
    </div>
);

// Toolbox Screen Component
const ToolboxScreen: React.FC<{ history: Activity[] }> = ({ history }) => {
    const [filter, setFilter] = useState<ActivityCategory | 'Todas'>('Todas');
    const [playingUrl, setPlayingUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Effect to handle component unmount cleanup
    useEffect(() => {
        // The function returned from useEffect is the cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = (url: string) => {
        // If the currently playing audio is clicked again, pause it.
        if (audioRef.current && playingUrl === url) {
            audioRef.current.pause();
            setPlayingUrl(null);
            return; // Exit the function
        }

        // If some other audio is playing, pause and release it.
        if (audioRef.current) {
            audioRef.current.pause();
        }

        // Create a new Audio instance for the new URL.
        const newAudio = new Audio(url);
        audioRef.current = newAudio;
        setPlayingUrl(url);

        // Add an event listener for when the audio finishes playing.
        newAudio.addEventListener('ended', () => {
            setPlayingUrl(null);
        });

        // Play the new audio and handle potential errors.
        newAudio.play().catch(e => {
            console.error("Error playing audio:", e);
            // If playing fails, reset the UI state.
            setPlayingUrl(null);
        });
    };

    const categories: (ActivityCategory | 'Todas')[] = [
        'Todas', 'En la Cocina', 'Día Lluvioso', 
        'Inteligencia Emocional', 'Memoria Rápida', 'Pre-lectura y Cuentos', 
        'Lógica y Números', 'Iniciación a la Lectura', 'Matemáticas Divertidas', 
        'Ciencia Curiosa'
    ];

    const filteredHistory = history.filter(item => filter === 'Todas' || item.category === filter);

    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Caja de Herramientas</h1>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-teal-700 mb-3">Audio-Estímulos</h2>
                <div className="space-y-3">
                    {AUDIO_STIMULI.map(audio => (
                       <div key={audio.title} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                            <div className="flex items-center mr-2">
                                <span className="text-3xl mr-4">{audio.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{audio.title}</h3>
                                    <p className="text-sm text-gray-500">{audio.description}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => togglePlay(audio.url)}
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center shadow hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                aria-label={playingUrl === audio.url ? `Pausar ${audio.title}` : `Reproducir ${audio.title}`}
                            >
                                {playingUrl === audio.url ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-teal-700 mb-3">Recetario de Actividades</h2>
                <div className="flex space-x-2 overflow-x-auto pb-3 mb-4">
                    {categories.map(cat => (
                         <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap ${filter === cat ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{cat}</button>
                    ))}
                </div>
                <div className="space-y-3">
                    {filteredHistory.length > 0 ? filteredHistory.map((item, index) => (
                         <details key={index} className="bg-white p-4 rounded-lg shadow">
                             <summary className="font-semibold cursor-pointer">{item.title}</summary>
                             <div className="mt-2 pt-2 border-t">
                                 <p className="text-sm text-gray-600"><strong className="text-gray-800">Materiales:</strong> {item.materials}</p>
                                 <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap"><strong className="text-gray-800">Instrucciones:</strong> {item.instructions}</p>
                             </div>
                         </details>
                    )) : <p className="text-center text-gray-500 mt-4">No hay actividades en esta categoría todavía.</p>}
                </div>
            </div>
        </div>
    );
};

// Method Screen Component
const MethodScreen: React.FC = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">El Método Celphu</h1>
        <div className="space-y-4">
            {ARTICLES.map((article, index) => (
                <details key={index} className="bg-white p-4 rounded-lg shadow">
                    <summary className="font-semibold text-teal-800 cursor-pointer">{article.title}</summary>
                    <p className="text-gray-600 mt-2 pt-2 border-t">{article.content}</p>
                </details>
            ))}
        </div>
    </div>
);


// App Component
export default function App() {
    const [ageGroup, setAgeGroup] = useLocalStorage<AgeGroup | null>('celphu_age_group', null);
    const [storedActivity, setStoredActivity] = useLocalStorage<StoredActivity | null>('celphu_daily_activity', null);
    const [activityHistory, setActivityHistory] = useLocalStorage<Activity[]>('celphu_activity_history', []);
    
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(storedActivity?.activity ?? null);
    const [isLoading, setIsLoading] = useState<boolean>(!storedActivity);
    const [error, setError] = useState<string | null>(null);
    
    const [activeScreen, setActiveScreen] = useState<Screen>('main');
    
    const [openCount, setOpenCount] = useLocalStorage<number>('celphu_open_count', 0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);

    useEffect(() => {
      const newCount = openCount + 1;
      setOpenCount(newCount);
      if (newCount === 5) {
          setShowModal(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const fetchActivity = useCallback(async (group: AgeGroup) => {
        setIsLoading(true);
        setError(null);
        try {
            const newActivity = await getDailyActivity(group);
            const newStoredActivity = { activity: newActivity, timestamp: Date.now() };
            setStoredActivity(newStoredActivity);
            setCurrentActivity(newActivity);
            // Add to history only if it's a new, unique activity title
            setActivityHistory(prev => {
                if (!prev.some(act => act.title === newActivity.title)) {
                    return [newActivity, ...prev];
                }
                return prev;
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    }, [setStoredActivity, setActivityHistory]);

    useEffect(() => {
        if (ageGroup) {
            const now = Date.now();
            if (!storedActivity || (now - storedActivity.timestamp > DAY_IN_MS)) {
                fetchActivity(ageGroup);
            } else {
                setCurrentActivity(storedActivity.activity);
                setIsLoading(false);
            }
        }
    }, [ageGroup, storedActivity, fetchActivity]);
    
    const handleChangeAge = () => {
        setAgeGroup(null);
        setStoredActivity(null);
        setCurrentActivity(null);
    };

    if (!ageGroup) {
        return <WelcomeScreen onSelectAge={setAgeGroup} />;
    }

    const renderScreen = () => {
        switch (activeScreen) {
            case 'main':
                return <MainScreen activity={currentActivity} ageGroup={ageGroup} isLoading={isLoading} error={error} onUnlockGenius={() => setShowPremiumModal(true)} onChangeAge={handleChangeAge} />;
            case 'toolbox':
                return <ToolboxScreen history={activityHistory} />;
            case 'method':
                return <MethodScreen />;
            default:
                return null;
        }
    };

    return (
        <div className="pb-24 bg-gray-50 min-h-screen">
             <header className="p-4 bg-white shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <CelphuLogo className="h-10 w-auto"/>
                {activeScreen !== 'main' && (
                    <button
                        onClick={() => setActiveScreen('main')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Volver al inicio"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </button>
                )}
            </header>
            <main>
                {renderScreen()}
            </main>
            {(activeScreen === 'toolbox' || activeScreen === 'method') && <ConversionBanner />}
            <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <FloatingButtons />
            {showModal && <ConversionModal onClose={() => setShowModal(false)} />}
            {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
        </div>
    );
}