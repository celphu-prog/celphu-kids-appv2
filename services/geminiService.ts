
import { GoogleGenAI, Type } from "@google/genai";
import type { Activity, AgeGroup } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "Un título creativo y corto para la actividad en español.",
        },
        difficulty: {
            type: Type.STRING,
            description: "Una clasificación de dificultad en español (ej. 'Fácil (5 minutos)', 'Moderado (10 minutos)').",
        },
        materials: {
            type: Type.STRING,
            description: "Una lista breve de materiales necesarios, separados por comas, en español.",
        },
        instructions: {
            type: Type.STRING,
            description: "Una guía paso a paso para realizar la actividad, escrita en español claro y sencillo para un padre.",
        },
        celphuConnection: {
            type: Type.STRING,
            description: "El 'Por qué' de la actividad. Explica en español, de forma convincente y fácil de entender, qué funciones cognitivas o hemisferios cerebrales se están estimulando, conectándolo con el 'Método Celphu' de fomento del genio. Menciona conceptos como permanencia del objeto, memoria espacial, resolución de problemas, etc.",
        },
        category: {
            type: Type.STRING,
            enum: ['En la Cocina', 'Día Lluvioso', 'Inteligencia Emocional', 'Memoria Rápida', 'Pre-lectura y Cuentos', 'Lógica y Números', 'Iniciación a la Lectura', 'Matemáticas Divertidas', 'Ciencia Curiosa'],
            description: "Elige la mejor categoría para esta actividad de la lista proporcionada.",
        },
    },
    required: ['title', 'difficulty', 'materials', 'instructions', 'celphuConnection', 'category']
};

const getPrompt = (ageGroup: AgeGroup): string => {
    let context = '';
    switch (ageGroup) {
        case '12-18 meses':
        case '19-24 meses':
        case '25-30+ meses':
            context = 'La actividad debe ser simple, enfocada en el desarrollo sensorial, motor y de permanencia del objeto. Utilizar objetos domésticos comunes.';
            break;
        case '31-48 meses':
            context = 'La actividad puede ser más compleja, involucrando clasificación simple, conteo inicial o juegos de roles. Fomentar el lenguaje y la autonomía.';
            break;
        case '4-5 años':
            context = 'La actividad debe enfocarse en habilidades pre-lectura, razonamiento lógico, conteo, resolución de problemas simples o habilidades sociales como turnos y cooperación. Puede ser un experimento científico simple o un juego de construcción con un objetivo.';
            break;
        case '6 años':
            context = 'La actividad debe ser un puente hacia la educación primaria. Enfócate en la iniciación a la lectura de frases cortas, resolución de problemas matemáticos simples (suma/resta), experimentos científicos caseros que despierten la curiosidad, o juegos que desarrollen el pensamiento crítico y la planificación.';
            break;
    }

    return `
Eres un experto en desarrollo infantil temprano y neurociencia, creando contenido para el "Método Celphu".
Genera una actividad de estimulación temprana única y práctica para un niño en el rango de edad de ${ageGroup}.
${context}
Debes devolver un único objeto JSON que se ajuste al esquema proporcionado.
`;
};

const getAdvancedPrompt = (ageGroup: AgeGroup) => `
Eres un experto de renombre mundial en desarrollo infantil temprano y neurociencia avanzada, elaborando contenido premium para el "Método Celphu".
Genera una actividad de estimulación temprana profundamente detallada y profunda para un niño en el rango de edad de ${ageGroup}. Debe ser un desafío más complejo o multifacético que una simple tarea diaria, involucrando profundamente las habilidades cognitivas del niño.
Debes devolver un único objeto JSON que se ajuste al esquema proporcionado. Las instrucciones deben incluir variaciones o ideas de extensión. La "celphuConnection" debe ser una explicación profunda y convincente, usando términos neurocientíficos específicos pero explicados de manera simple.
`;

const generateActivity = async (prompt: string, model: string, thinkingBudget?: number): Promise<Activity> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                ...(thinkingBudget && { thinkingConfig: { thinkingBudget } })
            },
        });
        
        const text = response.text.trim();
        const activity = JSON.parse(text) as Activity;
        return activity;

    } catch (error) {
        console.error("Error generating activity with Gemini:", error);
        throw new Error("No se pudo generar la actividad. Inténtalo de nuevo.");
    }
};

export const getDailyActivity = async (ageGroup: AgeGroup): Promise<Activity> => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const cacheKey = `daily_activity_${ageGroup}_${today}`;
    
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        try {
            console.log("Serving from cache for", ageGroup);
            return JSON.parse(cachedData) as Activity;
        } catch (e) {
            console.error("Failed to parse cached activity", e);
            localStorage.removeItem(cacheKey); // Clear corrupted cache
        }
    }

    console.log("Generating new activity via API for", ageGroup);
    const newActivity = await generateActivity(getPrompt(ageGroup), 'gemini-2.5-flash');
    
    try {
        localStorage.setItem(cacheKey, JSON.stringify(newActivity));
    } catch (e) {
        console.error("Failed to cache new activity", e);
    }

    return newActivity;
};

export const getAdvancedActivity = (ageGroup: AgeGroup): Promise<Activity> => {
    return generateActivity(getAdvancedPrompt(ageGroup), 'gemini-2.5-pro', 32768);
};
