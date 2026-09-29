# Validação da entrega

Verificações realizadas em 28/09/2026.

## Automatizadas

- `npm test`: quatro grupos aprovados, com casos de cálculo, unidades, entradas inválidas, limites de classificação, recuperação de histórico e CSV.
- `npm run lint`: sem erros.
- `npm run build`: build de produção gerada com sucesso.

## Navegador Chromium

O fluxo foi exercitado por automação Playwright em Chromium, com resolução desktop de 1440 × 1080 e viewport móvel de 390 × 844.

Verificados: carregamento sem overlay de erro; validação de formulário vazio e foco no primeiro erro; cálculo por Enter; resultado 22,86 para 70 kg e 1,75 m; classificação e linha destacada; salvamento sem duplicação pelo mesmo botão; download e conteúdo do CSV; persistência após recarregar; tema escuro persistente; centímetros e conversão para metros; resultado 32,65 para 100 kg e 1,75 m; voltar, limpar, excluir individualmente, cancelar e confirmar exclusão total; recuperação de JSON inválido; aviso e funcionamento em sessão com armazenamento bloqueado.

Não foram detectados erros de JavaScript da página. A tela móvel não apresentou rolagem horizontal do documento. Capturas desktop e móvel foram inspecionadas visualmente.

## Capturas

- `tela-desktop.png`: estado inicial no tema claro.
- `tela-resultado.png`: resultado e medição salva.
- `tela-mobile-escura.png`: visual móvel, tema escuro e histórico.
- `tela-historico.png`: histórico preenchido após a demonstração.
- `demo/Projeto-rodando.mp4`: vídeo curto capturado durante a navegação do app.

## Limites da validação

A verificação foi feita em Chromium. Não foi realizada uma auditoria completa de acessibilidade nem execução em Safari/Firefox. Não há integração com backend ou sincronização entre dispositivos.
