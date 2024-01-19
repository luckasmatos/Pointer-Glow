const CONTAINER = document.querySelector(".container");
const CARDS = document.querySelectorAll("article");

const CONFIG = {
  proximity: 40,
  spread: 80,
  blur: 20,
  gap: 32,
  vertical: false,
  opacity: 0,
  distance: 10,
};

const PROXIMITY = 10;
const ACTIVE_DISTANCE = true;

const UPDATE = (event) => {
  // obtendo o ângulo com base no ponto central do card e na posição do ponteiro do mouse
  for (const CARD of CARDS) {
    // Verificando o card em relação à proximidade do ponteiro do mouse e atualizando
    const CARD_BOUNDS = CARD.getBoundingClientRect();
    // Obtendo a distância entre o ponteiro do mouse e os limites externos do card
    if (
      event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
      event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
      event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
      event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
    ) {
      // Se estiver próximo, defina a opacidade ativa
      CARD.style.setProperty("--active", 1);
    } else {
      CARD.style.setProperty("--active", CONFIG.opacity);
    }
    const CARD_CENTER = [
      CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
      CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
    ];
    let ANGLE =
      (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180) /
      Math.PI;
    ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
    CARD.style.setProperty("--start", ANGLE + 90);

    let DISTANCE = ACTIVE_DISTANCE ? ((Math.sqrt((event?.x - CARD_CENTER[0])*(event?.x - CARD_CENTER[0]) + (event?.y - CARD_CENTER[1])*(event?.y - CARD_CENTER[1])))/150)*10 : CONFIG.distance;
    CARD.style.setProperty("--distance", `${DISTANCE > CONFIG.distance ? CONFIG.distance : DISTANCE}px`);
  }
};

document.body.addEventListener("pointermove", UPDATE);

const RESTYLE = () => {
  CONTAINER.style.setProperty("--gap", CONFIG.gap);
  CONTAINER.style.setProperty("--blur", CONFIG.blur);
  CONTAINER.style.setProperty("--spread", CONFIG.spread);
  CONTAINER.style.setProperty(
    "--direction",
    CONFIG.vertical ? "column" : "row"
  );
  CONTAINER.style.setProperty("--distance", CONFIG.distance);
};

RESTYLE();
UPDATE();
