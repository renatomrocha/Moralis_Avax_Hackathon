![Avalytics Logo](./img/AvalyticsLogoMini.png) ![Avalytics Logo](./img/AvalyticsLogo1Mini.png)

## Design Principles

When designing the app, [DDP: Decentralisation Design Principles](https://github.com/thisisbullish/ddp) by [thisisbullish](https://github.com/thisisbullish) was taken as a guiding source. The app does not contain any smart contracts as of January 2022, so these decentralization design principles will be especially important if any smart contracts are implemented.

When designing the user interface, the [Gestalt Principles](https://www.interaction-design.org/literature/topics/gestalt-principles) of School of [M. Wertheimer (Wertheimer, 2020)](https://link.springer.com/book/10.1007/978-3-030-36063-4) and the knowledge visualization guidelines of [Eppler and Burkhard (2008)](https://www.igi-global.com/chapter/knowledge-visualization/25136) were applied. 

For selecting the visualizations most suitable for each analysis, the [D3 Visualization Gallery](https://observablehq.com/@d3/gallery) available under [ObservableHQ](https://observablehq.com/) and [Flourish Studio Examples](https://flourish.studio/) were scanned and the following guideline documents were used as reference:
- [From Data to Viz](https://www.data-to-viz.com/)
- [The Data Visualization Catalogue](https://datavizcatalogue.com/search.html)
- [Visual Vocabulary](https://public.tableau.com/views/VisualVocabulary/VisualVocabulary?:showVizHome=no)
- [Power BI Visuals Reference](https://www.sqlbi.com/ref/power-bi-visuals-reference/) 
 
As a result of the extensive research and planning, many new visualizations have been implemented in Avalytics, the the best knowledge of the project team's knowledge, for the first time in the blockchain world. These innovative visualizations used in Avalytics include:
- [Timeline](https://observablehq.com/@mbostock/the-impact-of-vaccines) for visualizing price changes for multiple tokens at the same time, in a single succinct interactive chart.
- [Stacked area chart / Streamgraph](https://observablehq.com/@d3/streamgraph) for visualizing changes over time in total value locked (TVL) in [liquidity pools](https://traderjoexyz.com/pool) within the [TraderJoe](https://traderjoexyz.com) decentralized exchange (DEX). 
- [Bar chart race](https://app.flourish.studio/templates#template-bar-chart-race) for visualizing changes in market cap of Avalanche C-Chain tokens.

In designing and implementing the system, best effort was done to adhere to some of the [best practices of coding](https://code.tutsplus.com/tutorials/top-15-best-practices-for-writing-super-readable-code--net-8118).

**Index**

1. [Background](Background.md)
2. [Unique Value Offerings](UniqueValueOfferings.md)
3. **Design Principles**
4. [System Architecture](SystemArchitecture.md)
5. [Backend: Data under Moralis](Backend.md)
6. [Frontend: UI and Visual Analytics](Frontend.md)
7. [Technology/Tool Stack](TechnologyStack.md)
8. [Related Projects](RelatedProjects.md)
9. [Other Resources](OtherResources.md)
10. [Future Plans for Avalytics](FuturePlans.md)

<hline></hline>

[Back to Main GitHub Page](../README.md) | [Back to Documentation Index Page](Documentation.md)
