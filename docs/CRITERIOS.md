# Atendimento ao checkpoint

## Material analisado

- Enunciado: “Concluir a calculadora de IMC em React adicionando novas funcionalidades e modificando o layout (cores e aparência)”.
- Apresentação `Aula_19_ApplicationDevelopment_RevA.pptx`, com 40 slides.
- Código-fonte de `Aula19_2CCPH.rar`.

**Não foi identificada uma rubrica com pesos ou pontuações nos arquivos fornecidos.** A tabela abaixo é uma lista de correspondência ao enunciado e ao conteúdo da aula, não uma rubrica oficial nem uma garantia de nota.

| Requisito identificado | Implementação | Evidência para conferir |
| --- | --- | --- |
| Concluir a calculadora React | Fórmula funcional, inputs controlados e resultado | 70 kg e 1,75 m → IMC 22,86, Peso adequado |
| Componentes da aula | ImcCalc, ImcTable e Button preservados e concluídos | `src/components/` |
| Estado e comunicação por props | useState e callbacks no App/formulário | `App.jsx`, `ImcCalc.jsx` |
| Classificação e tabela | Seis faixas, destaque do resultado e graus corretos | `ImcTable.jsx`, `data.js` |
| Botões calcular, limpar e voltar | Envio, limpeza e retorno com foco | Interface e roteiro de demonstração |
| Novas funcionalidades | Histórico, CSV, unidades, validações e tema | Interface e `History.jsx` |
| Modificar cores e aparência | Identidade Equilíbrio, verde, cartões e temas | CSS e capturas incluídas, quando disponíveis |
| Uso em diferentes telas | Grade responsiva e controles adaptados | Desktop e celular |
| Identificar integrantes | Nomes completos e RMs | Rodapé e README |
| Facilitar execução e revisão | npm ci, scripts, testes, documentação | README, package.json e tests/ |

## Melhorias técnicas

- Classificação sem lacunas entre valores decimais e sem limite artificial em IMC 99.
- Cálculo validado antes da divisão; valores inválidos não geram NaN/Infinity na tela.
- Ausência de salvamento automático ou duplicação da mesma medição pelo botão Salvar.
- Recuperação de armazenamento indisponível ou JSON inválido.
- Tabela semântica, indicação textual da classificação e mensagens de erro junto aos campos.
