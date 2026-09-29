import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculateImc,
  classifyImc,
  parseDecimal,
  readHistory,
  historyCsv,
} from "../src/utils/imc.js";

test("calcula 70 kg / 1,75² e aceita vírgula, ponto e centímetros", () => {
  for (const [height, unit] of [
    ["1,75", "m"],
    ["1.75", "m"],
    ["175", "cm"],
  ]) {
    const { result } = calculateImc(height, "70", unit);
    assert.ok(Math.abs(result.imc - 22.857142857142858) < 1e-10);
    assert.equal(result.category.info, "Peso adequado");
  }
});
test("rejeita entradas vazias, negativas, zero, infinitas e malformadas", () => {
  for (const value of [
    "",
    "0",
    "-1",
    "abc",
    "1,2,3",
    "1.2.3",
    "Infinity",
    "1e2",
  ]) {
    assert.ok(calculateImc(value, "70").errors.height);
    assert.ok(calculateImc("1.75", value).errors.weight);
  }
  assert.ok(calculateImc("175", "70", "m").errors.height);
  assert.ok(calculateImc("1.75", "501").errors.weight);
  assert.equal(parseDecimal(" 70,5 "), 70.5);
});
test("classificação cobre todos os limites sem lacunas e sem arredondar antes", () => {
  const cases = [
    [18.4999, "Abaixo do peso"],
    [18.5, "Peso adequado"],
    [24.999, "Peso adequado"],
    [25, "Sobrepeso"],
    [29.999, "Sobrepeso"],
    [30, "Obesidade grau I"],
    [34.999, "Obesidade grau I"],
    [35, "Obesidade grau II"],
    [39.999, "Obesidade grau II"],
    [40, "Obesidade grau III"],
    [120, "Obesidade grau III"],
  ];
  for (const [imc, expected] of cases)
    assert.equal(classifyImc(imc).info, expected);
  for (const invalid of [0, -1, NaN, Infinity])
    assert.equal(classifyImc(invalid), undefined);
});
test("histórico resiste a JSON inválido e recalcula dados armazenados", () => {
  for (const value of ["invalid", "{}", "null", "[null,{}]"])
    assert.deepEqual(readHistory({ getItem: () => value }), []);
  assert.deepEqual(
    readHistory({
      getItem: () => {
        throw Error("blocked");
      },
    }),
    [],
  );
  const item = {
    id: "sample",
    date: "2026-09-28T12:00:00Z",
    height: 1.75,
    weight: 70,
    imc: 999,
  };
  const items = readHistory({
    getItem: () =>
      JSON.stringify(
        Array.from({ length: 25 }, (_, index) => ({
          ...item,
          id: String(index),
        })),
      ),
  });
  assert.equal(items.length, 20);
  assert.equal(items[0].category.info, "Peso adequado");
  assert.match(historyCsv(items), /"Peso \(kg\)";"Altura \(m\)"/);
  assert.match(historyCsv(items), /"22,86";"Peso adequado"/);
});
