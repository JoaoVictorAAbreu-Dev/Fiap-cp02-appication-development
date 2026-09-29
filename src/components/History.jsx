import { useState } from "react";
import Button from "./Button";
import { formatNumber, historyCsv } from "../utils/imc";

export default function History({ history, removeEntry, clearHistory }) {
  const [confirming, setConfirming] = useState(false);
  function exportCsv() {
    const url = URL.createObjectURL(
      new Blob([historyCsv(history)], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "historico-imc.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="card history" aria-labelledby="history-title">
      <div className="history-heading">
        <div>
          <div className="section-heading">ACOMPANHAMENTO</div>
          <h2 id="history-title">
            Seu histórico <span className="count">{history.length}</span>
          </h2>
        </div>
        {history.length > 0 && (
          <div className="actions compact">
            <Button
              variant="secondary"
              text="Exportar CSV ↓"
              action={exportCsv}
            />
            <Button
              variant="ghost"
              text="Apagar histórico"
              action={() => setConfirming(true)}
            />
          </div>
        )}
      </div>
      <p className="muted history-description">
        Até 20 medições salvas neste navegador. Você decide o que guardar.
      </p>
      {confirming && history.length > 0 && (
        <div className="confirmation" role="alert">
          <p>Apagar todas as medições? Esta ação não pode ser desfeita.</p>
          <Button
            variant="danger"
            text="Sim, apagar"
            action={() => {
              clearHistory();
              setConfirming(false);
            }}
          />
          <Button
            variant="secondary"
            text="Cancelar"
            action={() => setConfirming(false)}
          />
        </div>
      )}
      {!history.length ? (
        <div className="empty-history">
          <span aria-hidden="true">↗</span>
          <div>
            <strong>O primeiro registro é o começo.</strong>
            <p>Depois de calcular, clique em “Salvar medição”.</p>
          </div>
        </div>
      ) : (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id}>
              <div>
                <time dateTime={item.date}>
                  {new Date(item.date).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </time>
                <p>
                  {formatNumber(item.weight, 2)} kg ·{" "}
                  {formatNumber(item.height, 2)} m
                </p>
              </div>
              <div className="history-value">
                <strong>{formatNumber(item.imc, 2)}</strong>
                <span className={item.category.infoclass}>
                  {item.category.info}
                </span>
              </div>
              <button
                className="delete-entry"
                onClick={() => removeEntry(item.id)}
                aria-label={`Excluir medição de ${new Date(item.date).toLocaleString("pt-BR")}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
