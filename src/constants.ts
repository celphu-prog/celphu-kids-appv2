
import type { AgeGroup, Article, AudioStimulus } from './types';

export const AGE_GROUPS: AgeGroup[] = ['12-18 meses', '19-24 meses', '25-30+ meses', '31-48 meses', '4-5 años', '6 años'];

export const ARTICLES: Article[] = [
    {
        title: "¿Qué es el Hemisferio Derecho y por qué es crucial de 1 a 3 años?",
        content: "El hemisferio derecho es el centro de la intuición, la creatividad y la inteligencia emocional. Durante los primeros tres años, este hemisferio se desarrolla a un ritmo vertiginoso. Es la base para la resolución de problemas de forma no lineal y la memoria fotográfica. Las actividades que estimulan la percepción espacial, el reconocimiento de patrones y el juego simbólico, como las que proponemos en Celphu, fortalecen directamente estas capacidades fundamentales, creando un cerebro más equilibrado y potente para el futuro."
    },
    {
        title: "La Diferencia Real entre 'Memorizar' y 'Descubrir'.",
        content: "La memorización es un proceso pasivo, a menudo asociado con el hemisferio izquierdo y la repetición. El descubrimiento, en cambio, es un proceso activo y holístico que involucra todo el cerebro. Cuando un niño descubre algo por sí mismo —como encontrar un objeto escondido—, no solo recuerda la ubicación, sino que crea conexiones neuronales sobre causa y efecto, permanencia del objeto y estrategia. El método Celphu se centra en el descubrimiento, porque el aprendizaje que nace de la curiosidad es el que perdura toda la vida."
    },
    {
        title: "5 Mitos sobre la Estimulación Temprana (y lo que la ciencia sí dice).",
        content: "MITO 1: 'Más es mejor'. REALIDAD: La sobreestimulación puede ser contraproducente. La clave es la calidad y la conexión emocional. MITO 2: 'Necesitas juguetes caros'. REALIDAD: Los mejores 'juguetes' son objetos cotidianos que fomentan la imaginación. MITO 3: 'Los bebés no aprenden nada'. REALIDAD: El cerebro de un bebé forma más de un millón de nuevas conexiones neuronales por segundo. MITO 4: 'Hay que 'enseñar' formalmente'. REALIDAD: El juego es el lenguaje del aprendizaje en la infancia. MITO 5: 'Es una carrera de hitos'. REALIDAD: El desarrollo es un ritmo único, no una competencia. Nuestro método se enfoca en potenciar el proceso, no en acelerar el resultado."
    },
    {
        title: "Por qué el 'Juego' es el trabajo más serio de un niño.",
        content: "Cuando un niño juega, no está 'solo pasando el tiempo'. Está realizando experimentos científicos, resolviendo problemas de ingeniería, negociando contratos sociales y desarrollando su narrativa personal. El juego es la forma en que el cerebro procesa el mundo, prueba hipótesis y construye las estructuras cognitivas que usará para siempre. Cada actividad de Celphu está diseñada como un 'juego serio', una experiencia lúdica con un profundo propósito neurocientífico."
    }
];

export const AUDIO_STIMULI: AudioStimulus[] = [
    {
        title: "Sonidos del Bosque",
        description: "Para concentración y calma. Sonidos naturales que reducen el estrés y mejoran el enfoque.",
        icon: "🌳",
        url: "https://cdn.pixabay.com/audio/2022/10/21/audio_a27c732a39.mp3"
    },
    {
        title: "Ritmos de Causa y Efecto",
        description: "Sonidos simples que aparecen y desaparecen, ayudando a entender la permanencia auditiva.",
        icon: "🎵",
        url: "https://cdn.pixabay.com/audio/2022/05/23/audio_a15a812299.mp3"
    },
    {
        title: "Música Clásica para Mentes Creativas",
        description: "Fragmentos de Mozart y Bach para estimular las vías neuronales relacionadas con el razonamiento espacial.",
        icon: "🎼",
        url: "https://cdn.pixabay.com/audio/2022/03/13/audio_193971ac12.mp3"
    },
    {
        title: "Murmullos del Océano",
        description: "Un fondo sonoro relajante que promueve un estado de ánimo tranquilo, ideal para antes de la siesta.",
        icon: "🌊",
        url: "https://cdn.pixabay.com/audio/2024/01/24/audio_15bd4812ea.mp3"
    }
];