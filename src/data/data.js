// Limites superiores exclusivos evitam lacunas entre as classificações.
// Referência: https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html
export const data = [
  {
    min: 0,
    max: 18.5,
    classification: "Menor que 18,5",
    info: "Abaixo do peso",
    obesity: "—",
    infoclass: "under",
  },
  {
    min: 18.5,
    max: 25,
    classification: "18,5 a menos de 25",
    info: "Peso adequado",
    obesity: "—",
    infoclass: "good",
  },
  {
    min: 25,
    max: 30,
    classification: "25 a menos de 30",
    info: "Sobrepeso",
    obesity: "—",
    infoclass: "over",
  },
  {
    min: 30,
    max: 35,
    classification: "30 a menos de 35",
    info: "Obesidade grau I",
    obesity: "I",
    infoclass: "level1",
  },
  {
    min: 35,
    max: 40,
    classification: "35 a menos de 40",
    info: "Obesidade grau II",
    obesity: "II",
    infoclass: "level2",
  },
  {
    min: 40,
    max: Infinity,
    classification: "40 ou mais",
    info: "Obesidade grau III",
    obesity: "III",
    infoclass: "level3",
  },
];
