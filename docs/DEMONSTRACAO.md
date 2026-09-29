# Roteiro de demonstração

1. Apresente o objetivo: concluir a calculadora da Aula 19 e acrescentar acompanhamento de medições.
2. Mostre os nomes e RMs no rodapé.
3. Sem preencher nada, clique em **Calcular meu IMC**. Mostre as mensagens e o foco no campo com erro.
4. Digite **1,75 m** e **70 kg**. Pressione Enter: o resultado esperado é **22,86 — Peso adequado**. Mostre a linha destacada.
5. Clique em **Salvar medição**. O botão fica indisponível para essa medição e um registro aparece no histórico.
6. Recarregue a página: o registro permanece. Clique em **Ativar tema escuro** e recarregue novamente para demonstrar a persistência da preferência.
7. Alterne a altura para **cm** e informe **175** e **70**. O resultado é o mesmo. Alterne de volta para metros e veja a conversão.
8. Informe **1,75 m** e **100 kg**. O resultado é **32,65 — Obesidade grau I**. Salve a segunda medição.
9. Exporte o CSV e confira peso, altura, IMC, classificação e data.
10. Use **Voltar ao cálculo**, depois **Limpar**. Mostre o histórico preservado e os campos/resultados limpos.
11. Exclua uma medição. Teste **Apagar histórico → Cancelar**, depois **Apagar histórico → Sim, apagar**.
12. Demonstre o layout em uma tela estreita.

## Explicação técnica curta

“O App controla o resultado, o tema e o histórico. O ImcCalc controla os campos, valida as entradas e chama o cálculo. A função pura calculateImc normaliza a unidade e usa peso dividido pela altura ao quadrado. A classificação vem do array data e o ImcTable destaca a faixa. O histórico é salvo no localStorage somente ao clicar em Salvar medição, e o componente History permite excluir e exportar os registros.”

## Casos adicionais de revisão

| Caso | Resultado esperado |
| --- | --- |
| Altura `0`, negativa ou `abc` | Erro de altura, sem cálculo |
| Peso vazio, `0`, `-70` ou `70,5,2` | Erro de peso, sem cálculo |
| Altura `175` com unidade m | Erro que indica intervalo em metros |
| Altura `175` com unidade cm | Entrada aceita |
| Vírgula e ponto (`1,75` / `1.75`) | Resultados equivalentes |
| IMC exatamente 18,5 / 25 / 30 / 35 / 40 | Início da faixa correta |
| Armazenamento inválido | Interface continua disponível |
| Armazenamento bloqueado | Aviso e histórico disponível na sessão |
| Navegação por Tab e Enter | Foco visível e cálculo funcionando |

Execute `npm test`, `npm run lint` e `npm run build` antes de entregar. Os testes automatizados verificam fórmula, limites, entradas inválidas, histórico e geração de CSV.


## Vídeo curto

`demo/Projeto-rodando.mp4` mostra a tela carregada, o preenchimento das medidas, o cálculo e o salvamento de um registro no histórico.
