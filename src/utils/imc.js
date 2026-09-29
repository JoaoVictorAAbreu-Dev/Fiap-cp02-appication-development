import { data } from "../data/data.js";

export function parseDecimal(value) {
  const text = String(value).trim();
  return /^\d+(?:[.,]\d+)?$/.test(text) ? Number(text.replace(",", ".")) : NaN;
}

export function classifyImc(imc) {
  return Number.isFinite(imc) && imc > 0
    ? data.find((item) => imc >= item.min && imc < item.max)
    : undefined;
}

export function calculateImc(heightText, weightText, unit = "m") {
  const heightValue = parseDecimal(heightText);
  const weight = parseDecimal(weightText);
  const height = unit === "cm" ? heightValue / 100 : heightValue;
  const errors = {};
  if (!Number.isFinite(height) || height < 0.5 || height > 2.5)
    errors.height =
      unit === "cm"
        ? "Informe uma altura entre 50 e 250 cm."
        : "Informe uma altura entre 0,50 e 2,50 m.";
  if (!Number.isFinite(weight) || weight < 10 || weight > 500)
    errors.weight = "Informe um peso entre 10 e 500 kg.";
  if (Object.keys(errors).length) return { errors };
  const imc = weight / (height * height);
  return {
    result: { height, weight, imc, category: classifyImc(imc) },
    errors: {},
  };
}

export const formatNumber = (value, digits = 1) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export function readHistory(storage) {
  try {
    const entries = JSON.parse(storage.getItem("equilibrio-history") || "[]");
    if (!Array.isArray(entries)) return [];
    return entries
      .filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          Number.isFinite(Date.parse(item.date)) &&
          typeof item.weight === "number" &&
          typeof item.height === "number" &&
          !calculateImc(item.height, item.weight).errors.height &&
          !calculateImc(item.height, item.weight).errors.weight,
      )
      .slice(0, 20)
      .map((item) => ({
        id: item.id,
        date: item.date,
        ...calculateImc(item.height, item.weight).result,
      }));
  } catch {
    return [];
  }
}

export function historyCsv(history) {
  const rows = history.map((item) => [
    new Date(item.date).toLocaleString("pt-BR"),
    formatNumber(item.weight, 2),
    formatNumber(item.height, 2),
    formatNumber(item.imc, 2),
    item.category.info,
  ]);
  return (
    "\uFEFF" +
    [["Data", "Peso (kg)", "Altura (m)", "IMC", "Classificação"], ...rows]
      .map((row) =>
        row
          .map((cell) => '"' + String(cell).replaceAll('"', '""') + '"')
          .join(";"),
      )
      .join("\r\n")
  );
}
