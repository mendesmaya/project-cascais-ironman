# Iron Hunters · Cascais

Planeador para sábado, 17/10/2026. CP usa o horário de fim de semana em vigor desde 28/09/2026. GPX e distâncias são referências de 2024; caminhadas e alternativas externas são manuais.

## Sentidos de viagem

- Só ida: Biarritz → ponto GPX, com pelo menos 3 minutos antes do atleta. Não testa o regresso.
- Só volta: escolhe o ponto em que estás e a hora em que estás livre para sair. Exige 5 minutos de margem em Cascais e ignora a ida.
- Ida e volta: exige ambas as margens.

A recomendação escolhe a chegada mais cedo ao destino relevante entre as alternativas viáveis avaliadas. Não pesquisa automaticamente toda a rede de transportes nem garante o mais rápido no terreno.

## Comparar percursos

Em “Testar percursos”, consulta a pé ou em qualquer transporte público no Google Maps / operador. Define 17/10/2026 e a hora no serviço externo; o link não aplica essa data/hora automaticamente.

Insere tipo, descrição, saída e chegada no mesmo dia, incluindo esperas, transbordos e caminhadas. Ida: Biarritz → ponto GPX. Volta: ponto GPX → estação de Cascais. O site acrescenta a caminhada final até ao ponto do atleta para comparar o mesmo destino.

Os tempos CP são calculados. Outras alternativas são dados inseridos pelo utilizador após consulta e confirmação. Podem ser combinadas com CP em sentidos diferentes. São rejeitadas as linhas municipais suprimidas no aviso MobiCascais de 17/10 quando identificadas na descrição.

Há caminhadas separadas: Biarritz → Estoril, estação ↔ ponto (global ou por estação), estação Cascais → ponto do atleta. Os acessos exatos ao GPX não estão validados.

## Guia

[Guia de utilização PDF, com exemplos e testes](reports/guia_iron_hunters.pdf).

## Testes

`node tests/planner.test.js` ou `npm test`, sem dependências. Verificados 5.280 casos de estação/sentido e 3.600 valores de regressão CP contra a versão anterior. Exemplos oficiais de horários, limites de serviço, sentidos, rejeição de linhas suprimidas, comparação multimodal sintética, partilha e interações principais.

Os testes de software não medem trajetos reais. Dados sintéticos multimodais não são horários reais de autocarros ou tempos de caminhada.

## Fontes

- https://www.cp.pt/info/documents/d/cp/comboios-urbanos-lisboa-cascais-1
- https://www.cp.pt/info/w/linha-de-cascais-servico-rodoviario
- https://mobi.cascais.pt/aviso/ironman-2026-alteracoes-nas-linhas-municipais
- https://carrismetropolitana.pt/alerts
- https://www.cascais.pt/aviso/condicionamentos-de-transito-ironman-2026

Verificação documental em 14/10/2026. CP anuncia serviço rodoviário de substituição Caxias ↔ Cascais a partir das 20h50 aos sábados, excluído do cálculo CP automático. MobiCascais publica supressões e desvios específicos para 17/10. Confirma os avisos antes de sair.

## Cópias anteriores

- `backup-before-enhancements-2026-10-14`: versão anterior às melhorias.
- `backup-before-route-modes-2026-10-14`: versão anterior aos sentidos e alternativas.
- `original/ironman_cascais_planeador.html`: HTML original intacto, com horários simulados antigos.

## Abrir

Abre `index.html` ou serve a pasta com `python -m http.server 8000`. Fontes e mapa precisam de Internet. GitHub Pages: main / raiz. GitHub e Sites não se sincronizam automaticamente.
