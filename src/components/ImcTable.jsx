import { useEffect, useRef } from "react";
import Button from "./Button";
import { data } from "../data/data";
import { formatNumber } from "../utils/imc";
import "./ImcTable.css";

export default function ImcTable({ result, resetCalc, saved, saveResult }) {
  const heading = useRef(null);
  useEffect(() => {
    if (result) heading.current?.focus();
  }, [result]);
  return (
    <section className="card result-card" aria-labelledby="result-title">
      <div className="section-heading">
        <span className="step">02</span>
        <span>SEU RESULTADO</span>
      </div>
      {result ? (
        <div className="result-summary" aria-live="polite">
          <h2 id="result-title" ref={heading} tabIndex={-1}>
            Seu índice de massa corporal
          </h2>
          <div className={`result-number ${result.category.infoclass}`}>
            {formatNumber(result.imc, 2)}
            <small>kg/m²</small>
          </div>
          <span className={`badge ${result.category.infoclass}`}>
            {result.category.info}
          </span>
          <p className="muted">
            {formatNumber(result.weight, 2)} kg ·{" "}
            {formatNumber(result.height, 2)} m
          </p>
          <div className="result-actions">
            <Button
              text={saved ? "✓ Medição salva" : "Salvar medição"}
              action={saveResult}
              disabled={saved}
            />
            <Button
              id="back-btn"
              variant="secondary"
              text="Voltar ao cálculo"
              action={resetCalc}
            />
          </div>
        </div>
      ) : (
        <div className="empty-result">
          <div className="empty-symbol" aria-hidden="true">
            —
          </div>
          <h2 id="result-title">Seu resultado aparece aqui</h2>
          <p className="muted">
            Informe suas medidas para conhecer seu IMC
            <br className="desktop-break" /> e conferir a classificação na
            tabela.
          </p>
        </div>
      )}
      <div className="table-heading">
        <h3>Entenda as faixas de IMC</h3>
        <span>Adultos · 20 anos ou mais</span>
      </div>
      <div className="table-scroll">
        <table>
          <caption className="sr-only">
            Classificações do índice de massa corporal para adultos
          </caption>
          <thead>
            <tr>
              <th scope="col">IMC (kg/m²)</th>
              <th scope="col">Classificação</th>
              <th scope="col">Grau</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.info}
                className={
                  result?.category.info === item.info ? "selected" : ""
                }
                aria-current={
                  result?.category.info === item.info ? "true" : undefined
                }
              >
                <td>{item.classification}</td>
                <td>
                  <span
                    className={`dot ${item.infoclass}`}
                    aria-hidden="true"
                  />
                  {item.info}
                  {result?.category.info === item.info && (
                    <span className="sr-only"> (seu resultado)</span>
                  )}
                </td>
                <td>{item.obesity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        Classificação feita com o valor completo, antes do arredondamento.{" "}
        <a
          href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"
          target="_blank"
          rel="noreferrer"
        >
          Fonte: CDC ↗
        </a>
      </p>
    </section>
  );
}
