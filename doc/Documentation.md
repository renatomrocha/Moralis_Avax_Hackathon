## Avalytics Documentation

[Avalytics app](https://renatomrocha.github.io/Moralis_Avax_Hackathon/) is **an analytics dashboard to** interactively and dynamically **display changes in prices and market caps** of tokens on the [Avalanche C-Chain](https://uniswap.org) blockchain. Avalytics also provides analytical insights into the [liquidity pools](https://traderjoexyz.com/pool) in the [TraderJoe](https://traderjoexyz.com) decentralized exchange (DEX).

## Background: Avalanche, C-Chain, and Avalytics

[Avalanche](https://www.avax.network) is the one of the most popular Layer 1 blockchain networks in the world, which has unique advantages over other blockchain. Most importantly, Avalanche is one of the top Layer 1 networks which has resolved the ["blockchain trilemma"](https://www.gemini.com/cryptopedia/blockchain-trilemma-decentralization-scalability-definition), by achieving decentralization, scalability, and security at the same time.

One of the fundamental concepts in Avalanche is that Avalanche contains [three built-in blockchains](https://docs.avax.network/learn/platform-overview/): Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain). The X-Chain is mainly for minting smart digital assets as tokens. P-Chain is the meta-blockchain that coordinates all the components of Avalanche. C-Chain, an instance of the Ethereum Virtual Machine, is the chain where smart contracts are created and deployed. The focus of Avalytics is the Avalanche C-Chain and data regarding the tokens and transactions on the C-Chain.

The first blockchain with smart contract capability was Ethereum, yet the Ethereum network, as of January 2022, is still not scalable to achieve its full vision, specifically due to lack of scalibity and the associated expensive transaction fees. In blockchains with smart contracts, "gas fee" refers to the fee paid to the blockchain network for evaluating, executing, and recording a transaction. The gas fees are paid in the same token as the network, such as Ethereum tokens being used for transactions on the Ethereum blockchain, and Avalanche AVAX tokens being used for transactions on Avalanche C-Chain. The gas fees can change significantly over time, depending on the congestion of the network, level of liquidity, trade volume, and many other factors. One can learn more about gas fees, especially for Ethereum, from this [Hackernoon tutorial article](https://hackernoon.com/ethereum-gas-fees-for-dummies-oj8135nn), this [BeInCrypto tutorial article](https://beincrypto.com/learn/ethereum-gas-fees-lowest/) and this [Amberdata tutorial article](https://amberdata.io/docs/guides/ethereum-gas-price-and-predictions/). 

A clear advantage of Avalanche over Ethereum and most other Layer 1 blockchain networks is the very low gas fees needed for Avalanche transactions. This is due to Avalanche readily having achieved scalability, in addition to decentralization and security, as mentioned earlier. Another advantage of Avalanche is that tokens from other networks, can be imported into Avalance as ["wrapped tokens" through bridges](https://docs.avax.network/learn/avalanche-bridge-faq/), and transacted on the Avalanche C-Chain, at much lower cost. For example, Ethereum ETH tokens on the Ethereum network can be wrapped by the Avalanche C-Chain as WETH.e tokens and transacted on the Avalanche network, together with native Avalanche tokens (tokens minted and transacted natively in Avlaanche) such as Avalaunch (XAVA) and Pangolin (PNG). Due to these listed advantages and many others, Avalanche is positioned as a contender to achieve its [primary vision](https://www.youtube.com/watch?v=yaXR3kwSS9c) of digitally tokenizing all the assets in the world.

Since the swap gas fees vary over time continuously, and sometimes significantly, it is important to have an analytics tool that can provide insights on how the gas fees are changing over time. 

While there exist some websites/apps that report/visualize the Ethereum gas fees, to the author's best knowledge, there does _not_ exist a website/app that shows swap gas fees for the Unicode ecosystem. This project involves the design and communication of such an analytics app, as a first Dapp of its kind.

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

## Avalytics System Architecture


## Backend: Data Extraction and Processing

The following resources/libraries can be used for data extraction from Uniswap:

- The most **important** resource is the [Uniswap v3 contract maps](https://j1mmy.fi), which document the Pool Contract, Factory Contract, and Position Manager.
- [BitQuery](https://graphql.bitquery.io/ide) (to query data from blockchains)
- [Flipside Crypto](https://app.flipsidecrypto.com) (to query data from blockchains)
- [GraphQL](https://medium.com/coinmonks/get-uniswap-data-using-the-graph-79d0c6f7b9f2) (to extract data from Uniswap)

## Backend: Database under the Moralis Server


## Frontend: UI Design


This section describes the basic design of the user interface (UI) for the proposed SwapGasFees app. 
- A separate detailed [tutorial](Tutorial.md) describes the working of the designed app, explaining step by step, the different screens of the app. 
- The full UI design can be downloaded as a pdf file from [here](./figures/SwapGasFees_Design.pdf).

There are two main screens/interfaces in the app:

- **Interface 1:** Analytics for gas fees for a selected swap pair  (under the `Swap`, `Pools`, and `Favorites` tabs) 
- **Interface 2:** Analytics for gas fees and Uniswap pools, in general (under the `Charts` tab)

Now let us look into both of these interfaces, and explain each.


## Interface 1: Swap Gas Fees
1. After the `Show Swap Fees` button is clicked, the app extracts data from a database populated apriori, and displays two visualizations. 
2. The first visualization, on the upper right, is the swap gas fee for the selected fee, `by Hour` of the day. 
3. In the `by Hour` visualization, there are four rows, corresponding to the swap fees for `today`, `yesterday`, `this week`, and `this month`.
4. The black rectangle with the thick border shows the current time of the day.
5. The legend on the right hand side displays the fees with respect to the color scale.
6. The important text are shown in bold, including the text for `today`, current time, and fees for the current time and benchmark time points. 
7. The second visualization is on the lower right hand side, displaying swap gas fees `by Day`. 
8. The `by Day` visualization again displays the gas fees, but based on day of the year and month, enabling benchmark with previous months of the same year and the similar days of the past year.
9. In both visualizations, the unrealized future time periods are shown as blank (white color).
10. Using the two visualizations, a user can visually grasp whether now is a good time to swap or not.
11. Sample source code for implementing the first visualization can be found as ["World History Timeline"](https://observablehq.com/@tezzutezzu/world-history-timeline). Sample source code for the second calendar visualization can be found as ["Calendar"](https://observablehq.com/@d3/calendar), both under the [ObservableHQ Gallery](https://observablehq.com/@d3/gallery). The JavaScript visualization library used is [D3.js](https://d3js.org).
![](./figures/SwapGasFees_Design_03.png)

## Interface 2: Uniswap Analytics
1. The second main function of the SwapGasFees app is the display of various charts, under the `Charts` tab, to enable a deeper understanding of the Uniswap ecosystem.
2. The `Charts` tab implements a different interface than the earlier three tabs: There is a display (possibly with a legend) and two navigation buttons, namely `Previous Chart` and `Next Chart`. This interface design again is targeted to minimize the cognitive load on the user, allowing the user to digest the reported results one at a time.
3. The first screen has the `Previous Chart` button disabled, yet still in display, to provide a hint of what is to come.
4. The first screen of the `Charts` tab immediately provides the most important information, off the bat: _"What are the best times for swaps of top pairs?"_
5. The visualization shows time on the x axis and top pairs on the y axis (as rows). 
6. Each bar displays the favorable times for each swap pair. There has to be a consistent rule for all pairs, to identify the best times, such as _"Select the times where the price is at the lower 30% quartile"_.
7. While the presented visualization shows bars as a single color, each bar can potentially be drawn to allow a color spectrum.
8. Sample source code for implementing this visualization can be found as ["World timeline visualization"](https://observablehq.com/@tezzutezzu/world-history-timeline), under [ObservableHQ Gallery](https://observablehq.com/@d3/gallery). The JavaScript visualization library used is [D3.js](https://d3js.org).
![](./figures/SwapGasFees_Design_07.png)


## Frontend: Visual Analytics

The main library to be used for visualizations are selected as [D3.js](https://d3js.org) and [Flourish Studio](https://flourish.studio/): 
- [D3 Visualization Gallery](https://observablehq.com/@d3/gallery) (JavaScript library for manipulating documents based on data)
- [Flourish Studio](https://flourish.studio/) (JavaScript library and platform for creating interactive charts, maps, and stories from data)

The following are sample code for the visualizations presented throughout the SwapGasFees app:

<ul>
  <li>Visualizations for the <b>first three tabs</b></li>
      <ul>
        <li><a href="https://observablehq.com/@mbostock/the-impact-of-vaccines" target="_blank">Timeline</a> (for Screens 2-6)</li>
        <li><a href="https://observablehq.com/@d3/calendar" target="_blank">Calendar</a> (for Screens 2-6)</li>
      </ul> 
  <li>Visualizations for the <b>Charts tab</b></li>
      <ul>
        <li><a href="https://observablehq.com/@tezzutezzu/world-history-timeline" target="_blank">Timeline</a> (for Screen 7) (to see which are the cheapest hours or the day/week for each swap pair, where pairs are the rows, color is the gas fee)</li>
        <li><a href="https://observablehq.com/@d3/bubble-chart" target="_blank">Bubble chart</a> (for Screen 8) (showing volumes of all pairs, or coins in pools, size is volume, color can be volume/liquidity, red color tones if above median)</li>
        <li><a href="https://observablehq.com/@d3/streamgraph" target="_blank">Stacked Area Chart</a> (for Screen 9) (to see changes in volume and liquidity, color is pair)</li>
        <li><a href="https://observablehq.com/@mbostock/the-wealth-health-of-nations" target="_blank">Animated scatter plot</a> (for Screen 10) (to see changes in multiple dimensions, as an animation)</li>
        <li><a href="https://observablehq.com/@d3/chord-diagram" target="_blank">Chord diagram</a> (for Screen 11) (to see volume & liquidity changes in pools, and in coins)</li>
      </ul> 
  <li><b>Other</b> possible visualizations under <b>Charts</b></li>
      <ul>
        <li><a href="https://observablehq.com/@d3/realtime-horizon-chart" target="_blank">Realtime Horizon Chart</a> (scrolling data, where time is x axis, pair is y axis, and color is the gas fee)</li>
        <li><a href="https://observablehq.com/@d3/treemap" target="_blank">Treemap</a> (showing volumes of all pairs)</li>
        <li><a href="https://observablehq.com/@d3/sankey" target="_blank">Sankey Diagram</a> (changes in volume of pairs, color shows pair)</li>
        <li><a href="https://observablehq.com/@d3/arc-diagram" target="_blank">Arc diagram</a> (to see the pairs in the pools, color shows the main coin, such as ETH, USDT, USDC, DAI)</li>
  </ul> 
</ul> 

## Technology/Tool Stack

- For the **backend**, the above data extraction tools can be tested, and the one that provides the fastest and most reliable results can be selected.
- For the **frontend**, the easiest thing to do would be to fork the Uniswap front-end code and do modifications on that. 
- For **visualizations**, as mentioned earlier, the most suitable library is thought to be [D3.js](https://d3js.org/). The [D3 Visualization Gallery](https://observablehq.com/@d3/gallery) at [Observable HQ](https://observablehq.com/@d3/) provides sample source codes for all the essential charts, that can be used in the SwapGasFees app.

## Related Work

As mentioned earlier, there exist websites/apps that report/visualize the Ethereum gas fees. Some notable ones are the following:
- [Crypto.com DeFi Dashboard - Gas Fees:](https://crypto.com/defi/dashboard/gas-fees) This online service is most related to our proposed app, as it displays not only the Ethereum gas fees but also the gas fees for different swap pairs.
- [EthereumPrice.org:](https://ethereumprice.org/gas/) This website displays gas price over time, and time of the day. Especially the visualization of fees through heat map is impressive. While the information provided in SwapGasFees app overlaps with the information provided at EthereumPrice.org, the interface is designed to yield much more insights, through benchmarking. Furthermore, the mentioned website displays only Ethereum gas price and not the swap fees, whereas the SwapGasFees app designed in this project displays the latter.
- [Matteo Leibowitz's Dune Analytics Dashboards:](https://dune.xyz/MatteoLeibowitz/uniswap-community) This rich collection of dashboards display several statistics for the Uniswap ecosystem. In comparison to this collection, the goal of the SwapGasFees project was to develop a single intuitive dashboard app that presents only the most essential few visualizations.

## Future Plans for Avalytics


<hline>
</hline>
