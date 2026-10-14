# cascais-ironman

Race Day · Cascais — planeador interativo para acompanhar um atleta.

## Funcionalidades

- Estimativas de passagem a partir da hora em Biarritz e velocidade média.
- Itinerário com paragens reordenáveis, deslocações e pausas editáveis.
- Comparação de estações e alertas de margem insuficiente.
- Mapa do percurso GPX de 2024 e paragens selecionadas.
- Plano guardado em localStorage neste navegador.
- Impressão / guardar como PDF através do navegador.

## Abrir no computador

Descarrega o repositório e abre `index.html` no navegador. Não é necessário instalar dependências nem compilar.

Também podes abrir a pasta no VS Code e usar Live Server. Com Python instalado, executa na pasta:

```sh
python -m http.server 8000
```

Depois abre http://localhost:8000.

## Ficheiros

- `index.html`: estrutura e conteúdo.
- `style.css`: estilos e adaptação a telemóveis.
- `app.js`: cálculos, interações e armazenamento local.
- `track.js`: coordenadas do percurso fornecido no HTML original.

Leaflet, os mosaicos OpenStreetMap e Google Fonts precisam de ligação à Internet. Os cálculos funcionam sem o mapa.

## Estimativas

Os horários ferroviários são simulados, com cadência de 20 minutos, e não correspondem a uma consulta à CP. As deslocações entre paragens são tempos manuais editáveis. O traçado é de 2024: confirma o percurso, os acessos e os horários da edição que vais acompanhar.

## Publicação

Este é um site estático e pode ser alojado no GitHub Pages ou noutro alojamento estático. Para GitHub Pages, seleciona a branch `main` e a pasta `/ (root)` em Settings → Pages. A ativação do Pages não é feita por este commit.

A versão criada no Sites está em https://cascais-race-day-maya.royaltetra128.chatgpt.site (acesso privado). Este repositório contém uma cópia do código; alterações no GitHub e no Sites não são sincronizadas automaticamente.
