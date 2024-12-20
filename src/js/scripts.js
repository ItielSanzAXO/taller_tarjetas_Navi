const Mensajes = [
    "Feliz Navidad y feliz año nuevo",
    "Felices fiestas",
    "Feliz año nuevo",
    "Feliz navidad",
    "Felices fiestas y próspero año nuevo"
];

const Cupones = [
    "assets/Cupones/C01.png",
    "assets/Cupones/C02.png",
    "assets/Cupones/C03.png",
    "assets/Cupones/C04.png",
    "assets/Cupones/C05.png",
    "assets/Cupones/C06.png",
    "assets/Cupones/C07.png",
    "assets/Cupones/C08.png",
    "assets/Cupones/C09.png",
    "assets/Cupones/C10.png",
    "assets/Cupones/C11.png",
    "assets/Cupones/C12.png",
    "assets/Cupones/C13.png",
    "assets/Cupones/C14.png",
    "assets/Cupones/C15.png",
    "assets/Cupones/C16.png"
];

export function getCombinedMessage() {
    const randomMessages =
    Mensajes[Math.floor(Math.random() * Mensajes.length)];
  const randomCouponImage =
    Cupones[Math.floor(Math.random() * Cupones.length)];

  return {
    text: `${randomMessages}`,
    image: randomCouponImage
  };
}