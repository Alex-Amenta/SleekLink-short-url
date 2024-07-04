"use client";

import { useState } from "react";
import CaretUpIcon from "./ui/icons/navigation/CaretUpIcon";
import CaretDownIcon from "./ui/icons/navigation/CaretDownIcon";

const QUESTIONS = [
  {
    question: "¿Qué es un acortador de URL?",
    answer:
      "Un acortador de URL transforma enlaces largos en versiones más cortas y fáciles de compartir. Cuando se hace clic en un enlace acortado o se introduce en un navegador web, redirige al usuario a la URL original más larga. Estos servicios son útiles para ahorrar espacio, mejorar la estética de los enlaces y rastrear la cantidad de clics en los enlaces compartidos.🌐",
  },
  {
    question: "¿Por qué debería usar un acortador de URL?",
    answer:
      "Un acortador de URL ofrece ahorro de espacio y caracteres al transformar enlaces largos en versiones más cortas, estética mejorada, personalización de enlaces mediante palabras clave, seguimiento de clics para medir la efectividad de campañas, mayor confianza del usuario y compatibilidad con redes sociales y aplicaciones de mensajería. En resumen, los acortadores de URL hacen que los enlaces sean más manejables y fáciles de compartir. 🚀🔗",
  },
  {
    question: "¿Puedo personalizar mis enlaces acortados?",
    answer:
      "¡Por supuesto! En tu página, puedes personalizar los dominios de tus enlaces acortados. Esto significa que los usuarios pueden elegir palabras clave relevantes o nombres fáciles de recordar para sus enlaces cortos. Así, podrán crear enlaces más significativos y adaptados a sus necesidades. ¡Es una excelente característica para mejorar la experiencia de los usuarios! 🚀",
  },
  {
    question:
      "¿Cómo puedo rastrear cuántas veces se ha hecho clic en mis enlaces?",
    answer:
      "¡Excelente! Puedes rastrear cuántas veces se ha hecho clic en tus enlaces acortados directamente desde tu panel de control en nuestra aplicación. Allí encontrarás estadísticas detalladas sobre la cantidad de clics en cada enlace. ¡Es una herramienta útil para medir la efectividad de tus enlaces compartidos! 📊",
  },
  {
    question: "¿Es seguro utilizar un acortador de URL?",
    answer:
      "Utilizar un acortador de URL puede ser conveniente, pero también conlleva ciertos riesgos. Por un lado, los enlaces acortados ahorran espacio y mejoran la estética, pero por otro, pueden ocultar la verdadera dirección de destino. Algunos acortadores recopilan estadísticas sobre los clics, lo que puede afectar la privacidad. Por lo tanto, es importante elegir servicios confiables y verificar siempre la URL antes de hacer clic.",
  },
  {
    question: "¿Cuánto cuesta usar este servicio?",
    answer:
      "Este servicio es totalmente gratuita para todos los usuarios. No hay ningún costo asociado al uso del servicio de acortamiento de URLs. ¡Disfruta de la funcionalidad sin preocuparte por cargos!",
  },
  {
    question: "¿Cómo puedo contactar al soporte si tengo problemas?",
    answer: "Puedes contactarte al soporte directamente aqui: ",
  },
];

const FrequentQuestions = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <section className="my-32">
      <h2 className="text-3xl font-bold">Preguntas Frecuentes(FAQ) </h2>
      <ul>
        {QUESTIONS.map((q, index) => (
          <li key={index} className={`mt-4`}>
            <button
              className={`hover:underline underline-offset-4 decoration-green-600 flex justify-start items-center gap-2 text-pretty ${
                index === activeQuestion ? "underline" : null
              }`}
              onClick={() =>
                setActiveQuestion(index === activeQuestion ? null : index)
              }
            >
              <span className="text-left text-black/80 dark:text-white/80">
                {q.question}
              </span>
                {activeQuestion === index ? <CaretUpIcon /> : <CaretDownIcon />}
            </button>
            {activeQuestion === index && (
              <p className="mt-2 text-black/70 dark:text-white/70 bg-green-200 dark:bg-green-900 rounded-md p-2">
                {q.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FrequentQuestions;
