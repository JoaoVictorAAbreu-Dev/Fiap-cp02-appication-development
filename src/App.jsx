import { useRef, useState } from "react";
import ImcCalc from "./components/ImcCalc";
import ImcTable from "./components/ImcTable";
import History from "./components/History";
import { readHistory } from "./utils/imc";
import "./App.css";

function initialHistory() {
  try {
    return readHistory(window.localStorage);
  } catch {
    return [];
  }
}
function initialTheme() {
  try {
    return localStorage.getItem("equilibrio-theme") === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(initialHistory);
  const [theme, setTheme] = useState(initialTheme);
  const [notice, setNotice] = useState("");
  const formArea = useRef(null);
  const saved = result && history.some((item) => item.id === result.id);

  function updateHistory(next) {
    setHistory(next);
    try {
      localStorage.setItem("equilibrio-history", JSON.stringify(next));
      setNotice("Histórico atualizado.");
    } catch {
      setNotice(
        "Não foi possível salvar no navegador. Os registros ficam disponíveis apenas nesta sessão; você pode exportar o CSV.",
      );
    }
  }
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("equilibrio-theme", next);
    } catch {
      /* O tema continua funcionando nesta sessão. */
    }
  }
  function calculate(value) {
    setResult({
      ...value,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    });
    setNotice("");
  }
  function resetCalc() {
    setResult(null);
    setNotice("");
    formArea.current?.querySelector("input")?.focus();
  }

  return (
    <div className="app" data-theme={theme}>
      <a className="skip-link" href="#main">
        Pular para a calculadora
      </a>
      <header className="header">
        <a className="brand" href="#main">
          <span className="brand-mark" aria-hidden="true">
            e.
          </span>
          equilíbrio<span className="brand-tag">IMC</span>
        </a>
        <button
          className="theme-button"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"
          }
        >
          {theme === "light" ? "◐" : "☀"}
          <span>Tema {theme === "light" ? "escuro" : "claro"}</span>
        </button>
      </header>
      <main id="main" className="container">
        <section className="intro">
          <p className="eyebrow">
            <span /> UM OLHAR PARA O SEU BEM-ESTAR
          </p>
          <h1>
            Conheça seu IMC.
            <br />
            <span>Entenda suas medidas.</span>
          </h1>
          <p>
            Um cálculo simples para acompanhar você.
            <br />
            Veja seu resultado e guarde suas medições em um só lugar.
          </p>
        </section>
        <div className="calculator-grid">
          <div ref={formArea}>
            <ImcCalc calcImc={calculate} resetCalc={resetCalc} />
            <aside className="health-note">
              <strong>Você vai além de um número.</strong>
              <p>
                O IMC é uma medida de triagem para adultos a partir de 20 anos.
                Não avalia a composição corporal nem substitui uma avaliação
                profissional.
              </p>
            </aside>
          </div>
          <ImcTable
            result={result}
            resetCalc={resetCalc}
            saved={!!saved}
            saveResult={() => {
              if (result && !saved)
                updateHistory([result, ...history].slice(0, 20));
            }}
          />
        </div>
        <p className="notice" role="status">
          {notice}
        </p>
        <History
          history={history}
          removeEntry={(id) =>
            updateHistory(history.filter((item) => item.id !== id))
          }
          clearHistory={() => updateHistory([])}
        />
      </main>
      <footer className="footer">
        <div>
          <span className="footer-brand">equilíbrio.</span>
          <p>Checkpoint · Application Development · 2CCPH</p>
        </div>
        <div className="authors">
          <p>
            João Victor Alves de Abreu <strong>RM564946</strong>
          </p>
          <p>
            Rodrigo Kenshin Viana Matayoshi <strong>RM564026</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
