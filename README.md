# Iron Hunters · Cascais

Planeador para sábado, 17/10/2026. Os comboios usam o horário CP de fim de semana em vigor desde 28/09/2026; as passagens do atleta e as caminhadas são estimativas.

## Funcionalidades

- Melhor estação em destaque, com origem/destino e horários de cada etapa.
- Explicação dos resultados inviáveis (passagem perdida, margem insuficiente ou falta de serviço ferroviário).
- Consulta de caminhadas estação ↔ ponto GPX em Google Maps, com aviso de acesso não validado.
- Comparação da velocidade escolhida com cenários de ±2,5 km/h.
- Modo prova com horários essenciais em letra maior.
- Partilha por URL com hora, velocidade, caminhada e modo de apresentação.
- Fontes oficiais, data da verificação e ilustrações SVG de triatlo.
- Mapa GPX de 2024, tabela 10h30–11h30 e impressão / PDF.

## Cópia anterior

A versão anterior às melhorias está preservada na branch [backup-before-enhancements-2026-10-14](https://github.com/mendesmaya/project-cascais-ironman/tree/backup-before-enhancements-2026-10-14).

O ficheiro original enviado, com horários simulados, permanece intacto em `original/ironman_cascais_planeador.html`.

## Precisão

- Ida: estação do Estoril → estação selecionada.
- Regresso: estação selecionada → estação de Cascais.
- `Pronto em Cascais` inclui 10 minutos manuais a pé depois de sair do comboio.
- Uma opção viável exige pelo menos 3 minutos antes da passagem no ponto e 5 minutos de margem em Cascais.
- O tempo de caminhada é global e manual: Biarritz → Estoril e cada sentido estação ↔ ponto. Pode ser ajustado entre 1 e 60 minutos. O Google Maps não transfere tempos automaticamente para o planeador.
- Os pontos e distâncias são referências aproximadas do HTML original / GPX de 2024. Não são acessos pedonais validados para a prova de 2026. Consulta os condicionamentos locais antes de seguir direções.
- Só se calculam viagens integralmente ferroviárias. Os autocarros de substituição noturnos não estão incluídos.
- A verificação de 14/10/2026 não encontrou aviso específico para a manhã da prova; a CP prevê substituição rodoviária Caxias ↔ Cascais a partir das 20h50 aos sábados.
- Não há consulta em tempo real, previsão de atrasos nem atualização automática dos horários.

Fontes:

- https://www.cp.pt/info/documents/d/cp/comboios-urbanos-lisboa-cascais-1
- https://www.cp.pt/info/w/linha-de-cascais-servico-rodoviario
- https://www.cascais.pt/aviso/condicionamentos-de-transito-ironman-2026

## Abrir e verificar

Abre `index.html` ou serve a pasta com `python -m http.server 8000`. Fontes, Leaflet e mosaicos OpenStreetMap precisam de Internet; os cálculos e as ligações pedonais funcionam se o mapa não carregar.

Com Node instalado, executa `node tests/planner.test.js` ou `npm test`. Não há dependências a instalar nem compilação. Os testes cobrem exemplos do horário CP, limites do serviço ferroviário, recomendações, partilha, sentidos dos links pedonais e interações principais.

GitHub Pages: Settings → Pages → Deploy from a branch → main → /(root).
