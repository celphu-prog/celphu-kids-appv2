
export type AgeGroup = '12-18 meses' | '19-24 meses' | '25-30+ meses' | '31-48 meses' | '4-5 años' | '6 años';

export type ActivityCategory = 
    'En la Cocina' | 
    'Día Lluvioso' | 
    'Inteligencia Emocional' | 
    'Memoria Rápida' | 
    'Pre-lectura y Cuentos' | 
    'Lógica y Números' |
    'Iniciación a la Lectura' |
    'Matemáticas Divertidas' |
    'Ciencia Curiosa';

export interface Activity {
  title: string;
  difficulty: string;
  materials: string;
  instructions: string;
  celphuConnection: string;
  category: ActivityCategory;
}

export interface StoredActivity {
  activity: Activity;
  timestamp: number;
}

export interface Article {
  title: string;
  content: string;
}

export interface AudioStimulus {
    title: string;
    description: string;
    icon: string;
    url: string;
}

export type Screen = 'main' | 'toolbox' | 'method';
