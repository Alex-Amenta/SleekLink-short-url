import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedScroll from "./ui/animations/AnimatedScroll";

const QUESTIONS = [
  {
    item: "item-1",
    question: "¿Qué es un acortador de URL?",
    answer:
      "Un acortador de URL transforma enlaces largos en versiones más cortas y fáciles de compartir. Cuando se hace clic en un enlace acortado o se introduce en un navegador web, redirige al usuario a la URL original más larga. Estos servicios son útiles para ahorrar espacio, mejorar la estética de los enlaces y rastrear la cantidad de clics en los enlaces compartidos.🌐",
  },
  {
    item: "item-2",
    question: "¿Por qué debería usar un acortador de URL?",
    answer:
      "Un acortador de URL ofrece ahorro de espacio y caracteres al transformar enlaces largos en versiones más cortas, estética mejorada, personalización de enlaces mediante palabras clave, seguimiento de clics para medir la efectividad de campañas, mayor confianza del usuario y compatibilidad con redes sociales y aplicaciones de mensajería. En resumen, los acortadores de URL hacen que los enlaces sean más manejables y fáciles de compartir. 🚀🔗",
  },
  {
    item: "item-3",
    question: "¿Puedo personalizar mis enlaces acortados?",
    answer:
      "¡Por supuesto! En tu página, puedes personalizar los dominios de tus enlaces acortados. Esto significa que los usuarios pueden elegir palabras clave relevantes o nombres fáciles de recordar para sus enlaces cortos. Así, podrán crear enlaces más significativos y adaptados a sus necesidades. ¡Es una excelente característica para mejorar la experiencia de los usuarios! 🚀",
  },
  {
    item: "item-4",
    question:
      "¿Cómo puedo rastrear cuántas veces se ha hecho clic en mis enlaces?",
    answer:
      "¡Excelente! Puedes rastrear cuántas veces se ha hecho clic en tus enlaces acortados directamente desde tu panel de control en nuestra aplicación. Allí encontrarás estadísticas detalladas sobre la cantidad de clics en cada enlace. ¡Es una herramienta útil para medir la efectividad de tus enlaces compartidos! 📊",
  },
  {
    item: "item-5",
    question: "¿Es seguro utilizar un acortador de URL?",
    answer:
      "Utilizar un acortador de URL puede ser conveniente, pero también conlleva ciertos riesgos. Por un lado, los enlaces acortados ahorran espacio y mejoran la estética, pero por otro, pueden ocultar la verdadera dirección de destino. Algunos acortadores recopilan estadísticas sobre los clics, lo que puede afectar la privacidad. Por lo tanto, es importante elegir servicios confiables y verificar siempre la URL antes de hacer clic.",
  },
  {
    item: "item-6",
    question: "¿Cuánto cuesta usar este servicio?",
    answer:
      "Este servicio es totalmente gratuita para todos los usuarios. No hay ningún costo asociado al uso del servicio de acortamiento de URLs. ¡Disfruta de la funcionalidad sin preocuparte por cargos!",
  },
  {
    item: "item-7",
    question: "¿Cómo puedo contactar al soporte si tengo problemas?",
    answer: "Puedes contactarte al soporte directamente aqui: ",
  },
];

const FrequentQuestions = () => {

  return (
    <AnimatedScroll>
    <section className="my-32">
      <h2 className="text-3xl font-bold mb-5">Preguntas Frecuentes(FAQ) </h2>
      <Accordion type="single" collapsible>
        {QUESTIONS.map((q, index) => (
          <AccordionItem key={index} value={q.item}>
            <AccordionTrigger>{q.question}</AccordionTrigger>
            <AccordionContent className="leading-7 text-black/70 dark:text-white/70">{q.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
    </AnimatedScroll>
  );
};

export default FrequentQuestions;
