export const powerUps = {
  fiftyFifty: {
    id: "fiftyFifty",
    name: "50:50",
    icon: "fa-scissors",
    emoji: "\u2702\uFE0F",
    description: "Elimina dos respuestas incorrectas",
    initialCount: 3,
  },
  extraTime: {
    id: "extraTime",
    name: "Tiempo Extra",
    icon: "fa-stopwatch",
    emoji: "\u23F1\uFE0F",
    description: "Anade 10 segundos al temporizador",
    initialCount: 2,
  },
  extraHint: {
    id: "extraHint",
    name: "Pista Extra",
    icon: "fa-lightbulb",
    emoji: "\u{1F4A1}",
    description: "Muestra un emoji adicional como pista",
    initialCount: 3,
  },
  skipQuestion: {
    id: "skipQuestion",
    name: "Saltar",
    icon: "fa-forward",
    emoji: "\u23ED\uFE0F",
    description: "Salta la pregunta sin perder vida",
    initialCount: 1,
  },
};
