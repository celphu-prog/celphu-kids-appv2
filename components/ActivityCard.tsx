
import React from 'react';
import type { Activity } from '../types';

interface ActivityCardProps {
    activity: Activity;
}

const InfoBlock: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <div className="mt-4">
        <h3 className="text-lg font-semibold text-teal-700 flex items-center">
            <span className="text-2xl mr-2">{icon}</span>
            {title}
        </h3>
        <div className="text-gray-600 mt-1 pl-8">{children}</div>
    </div>
);

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto border-t-8 border-teal-500">
            <div className="text-center">
                <span className="text-sm font-semibold text-sky-500 bg-sky-100 px-3 py-1 rounded-full">{activity.category}</span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{activity.title}</h2>
                <p className="text-amber-500 font-medium mt-1">{activity.difficulty}</p>
            </div>

            <div className="mt-6">
                <InfoBlock title="Materiales" icon="🛠️">
                    <p>{activity.materials}</p>
                </InfoBlock>

                <InfoBlock title="Instrucciones Prácticas" icon="📋">
                    <p className="whitespace-pre-wrap">{activity.instructions}</p>
                </InfoBlock>

                <InfoBlock title="La Conexión Celphu" icon="🧠">
                    <p className="italic text-teal-800 bg-teal-50 p-3 rounded-lg">{activity.celphuConnection}</p>
                </InfoBlock>
            </div>
        </div>
    );
};
