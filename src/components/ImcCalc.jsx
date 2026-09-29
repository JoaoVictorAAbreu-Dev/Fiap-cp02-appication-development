import { useRef, useState } from "react";
import Button from "./Button";
import { calculateImc, parseDecimal } from "../utils/imc";
import "./ImcCalc.css";

export default function ImcCalc({ calcImc, resetCalc }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("m");
  const [errors, setErrors] = useState({});
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  function clearForm() {
    resetCalc();
    setHeight("");
    setWeight("");
    setErrors({});
    heightRef.current.focus();
  }
  function changeUnit(next) {
    const value = parseDecimal(height);
    if (next !== unit && Number.isFinite(value)) {
      setHeight(
        String(
          Number((next === "cm" ? value * 100 : value / 100).toFixed(4)),
        ).replace(".", ","),
      );
    }
    setUnit(next);
    setErrors({});
  }
  function submit(event) {
    event.preventDefault();
    const calculated = calculateImc(height, weight, unit);
    setErrors(calculated.errors);
    if (calculated.result) calcImc(calculated.result);
    else (calculated.errors.height ? heightRef : weightRef).current.focus();
  }

  return (
    <section className="card calculator" aria-labelledby="calc-title">
      <div className="section-heading">
        <span className="step">01</span>
        <span>SUAS MEDIDAS</span>
      </div>
      <h2 id="calc-title">Vamos calcular?</h2>
      <p className="muted">Preencha sua altura e seu peso atual.</p>
      <form onSubmit={submit} noValidate>
        <div className="form-control">
          <div className="label-row">
            <label htmlFor="height">Altura</label>
            <div
              className="unit-toggle"
              role="group"
              aria-label="Unidade de altura"
            >
              {["m", "cm"].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={unit === value}
                  onClick={() => changeUnit(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="input-wrap">
            <input
              ref={heightRef}
              id="height"
              name="height"
              inputMode="decimal"
              maxLength={10}
              placeholder={unit === "m" ? "1,75" : "175"}
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setErrors((previous) => ({ ...previous, height: "" }));
              }}
              aria-invalid={!!errors.height}
              aria-describedby={errors.height ? "height-error" : "height-hint"}
            />
            <span>{unit}</span>
          </div>
          {errors.height ? (
            <p id="height-error" className="error" role="alert">
              {errors.height}
            </p>
          ) : (
            <p id="height-hint" className="field-hint">
              Use vírgula ou ponto para os decimais.
            </p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="weight">Peso</label>
          <div className="input-wrap">
            <input
              ref={weightRef}
              id="weight"
              name="weight"
              inputMode="decimal"
              maxLength={10}
              placeholder="70,5"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setErrors((previous) => ({ ...previous, weight: "" }));
              }}
              aria-invalid={!!errors.weight}
              aria-describedby={errors.weight ? "weight-error" : undefined}
            />
            <span>kg</span>
          </div>
          {errors.weight && (
            <p id="weight-error" className="error" role="alert">
              {errors.weight}
            </p>
          )}
        </div>
        <div className="actions">
          <Button id="calc-btn" type="submit" text="Calcular meu IMC →" />
          <Button
            id="clear-btn"
            variant="secondary"
            text="Limpar"
            action={clearForm}
          />
        </div>
      </form>
      <div className="formula">
        <span>COMO FUNCIONA</span>
        <p>IMC = peso (kg) ÷ altura (m)²</p>
      </div>
    </section>
  );
}
