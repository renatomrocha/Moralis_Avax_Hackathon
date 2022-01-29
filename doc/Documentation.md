![Avalytics Logo](./img/AvalyticsLogo1Mini.png)

## Documentation

[Avalytics app](https://renatomrocha.github.io/Moralis_Avax_Hackathon/) is **an analytics dashboard to** interactively and dynamically **display changes in prices and market caps** of tokens on the [Avalanche C-Chain](https://uniswap.org) blockchain. Avalytics also provides analytical insights into the [liquidity pools](https://traderjoexyz.com/pool) in the [TraderJoe](https://traderjoexyz.com) decentralized exchange (DEX).

This documentation presents details on the Avalytics app and project.

## Background: Avalanche, C-Chain, Moralis, and Avalytics

[Avalanche](https://www.avax.network) is the one of the most popular Layer 1 blockchain networks in the world, which has unique advantages over other blockchain. Most importantly, Avalanche is one of the top Layer 1 networks which has resolved the ["blockchain trilemma"](https://www.gemini.com/cryptopedia/blockchain-trilemma-decentralization-scalability-definition), by achieving decentralization, scalability, and security at the same time.

One of the fundamental concepts in Avalanche is that Avalanche contains [three built-in blockchains](https://docs.avax.network/learn/platform-overview/): Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain). The X-Chain is mainly for minting smart digital assets as tokens. P-Chain is the meta-blockchain that coordinates all the components of Avalanche. C-Chain, an instance of the Ethereum Virtual Machine, is the chain where smart contracts are created and deployed. The focus of Avalytics is the Avalanche C-Chain and data regarding the tokens and transactions on the C-Chain.

The first blockchain with smart contract capability was Ethereum, yet the Ethereum network, as of January 2022, is still not scalable to achieve its full vision, specifically due to lack of scalibity and the associated expensive transaction fees. In blockchains with smart contracts, "gas fee" refers to the fee paid to the blockchain network for evaluating, executing, and recording a transaction. The gas fees are paid in the same token as the network, such as Ethereum tokens being used for transactions on the Ethereum blockchain, and Avalanche AVAX tokens being used for transactions on Avalanche C-Chain. The gas fees can change significantly over time, depending on the congestion of the network, level of liquidity, trade volume, and many other factors. One can learn more about gas fees, especially for Ethereum, from this [Hackernoon tutorial article](https://hackernoon.com/ethereum-gas-fees-for-dummies-oj8135nn), this [BeInCrypto tutorial article](https://beincrypto.com/learn/ethereum-gas-fees-lowest/) and this [Amberdata tutorial article](https://amberdata.io/docs/guides/ethereum-gas-price-and-predictions/). 

A clear advantage of Avalanche over Ethereum and most other Layer 1 blockchain networks is the very low gas fees needed for Avalanche transactions. This is due to Avalanche readily having achieved scalability, in addition to decentralization and security, as mentioned earlier. Another advantage of Avalanche is that tokens from other networks, can be imported into Avalance as ["wrapped tokens" through bridges](https://docs.avax.network/learn/avalanche-bridge-faq/), and transacted on the Avalanche C-Chain, at much lower cost. For example, Ethereum ETH tokens on the Ethereum network can be wrapped by the Avalanche C-Chain as WETH.e tokens and transacted on the Avalanche network, together with native Avalanche tokens (tokens minted and transacted natively in Avlaanche) such as Avalaunch (XAVA) and Pangolin (PNG). Due to these listed advantages and many others, Avalanche is positioned as a contender to achieve its [primary vision](https://www.youtube.com/watch?v=yaXR3kwSS9c) of digitally tokenizing all the assets in the world.

The main motivation for Avalytics was the absence of a dedicated analytics dashboard for the Avalanche ecosystem. Given the experience and expertise of the team members with data analytics, addressing this gap was identified as the target of the Avalytics project.

The [Moralis+Avalanche Hackathon]() already requires that the app for the hackathon is developed using Moralis and Avalanche. Yet, Moralis would still be a viable alternative for developing the Avalytics app even if this requirement was not there. Building apps with Moralis consists of much [simpler steps](https://www.youtube.com/watch?v=S60H2GMRaRY) and can relieve developers from many of the burdens of blockchain programming, such as RPC node setup, indexing, signature verification, and smart contract synchronization. Moralis can help developers significantly in reducing product-to-market time and improving product quality. Moralis allows blockchain developers to stand on the shoulders of blockchain giants and gurus, and rapidly find a place in this new and exciting industry.

There exist multiple block explorers and dashboards that provide data and insights on the Avalanche blockchain. Notable systems include [SnowTrace](https://snowtrace.io/), developed by [AvaLabs](https://www.avalabs.org/), []() and [](). While these tools are excellent, we, as the developer team, did _not_ encounter a website/app that provides the utility and insights we had in mind. The Avalytics project thus involves the design, development, deployment, and communication of such an analytics dashboard app, with many firsts in comparion to its peers.

## Unique Value Offerings

Avalytics brings the following value offerings to Avalanche and blockchain industry:

Avalytics is the first integrated analytics dashboard 
1. specifically developed for and dedicated to the Avalance C-Chain ecosystem
2. developed using Moralis
3. that analyzes TraderJoe pools
4. that implements several novel interactive and animated visualizations for the first time in blockchain industry, enabling fresh insights into on-chain data
5. that implements correlation analysis for top Avalanche tokens
6. that boosts Avalanche DEX reporting capabilities with CEX features, such as [candlestick charts](https://www.coingecko.com/buzz/how-to-read-candlestick-charts)
7. with extensive documentation available publicly on github

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

## Avalytics System Architecture

Avalytics' system architecture is illustrated in the following figure:

![Avalytics System Architecture](./img/SystemArchitecture.png)

According to this illustration, 
1. Source of all data is the `Avalanche C-Chain` and is read/acquired from the source through the Moralis API.
2. Data acquired from the C-Chain is stored in a Moralis database as the `Staging Layer`.
3. Through running Python programs at a `Cloud Service` (AWS, in the current implementation), the data in the staging layer is processed.
4. The data processed at the cloud service is sent back to Moralis, into a database, which serves as the `Consumption Layer`.
5. The data available at the consumption layer is queried on the frontend with Javascript, using React.js. 
6. Data queried from the consumption layer is visualized within the Avalytics app, using [D3.js](https://d3js.org/) and [Flourish Studio](https://flourish.studio/) Javascript libraries.


## Backend: Data under Moralis 

**Token Selection**

The data for Avalytics is stored in a Moralis Avalanche server. Older data of finer resolution is archived under AWS. Data at the `Staging Layer` is processed with Python under AWS and saved to the `Consumption Stage`, again under Moralis.

The tokens to be included in the dashboard were selected based on a procedure with multiple criteria. Firstly, a database of all major Avalanche tokens was constructed, to include top tokens as suggested by [SnowTrace](https://snowtrace.io) and [Avalanche Tokens under CoinMarketCap](https://coinmarketcap.com/view/avalanche-ecosystem/), as follows:

![Token Selection Sheet](./img/TokenSelectionSheet.png)

The tokens were shortlisted according to several criteria, including SnowTrace rank, CoinMarketCap rank, availability in Moralis, and whether the token's issuer is a sponsor of the Morali+Avalanche hackathon or not. Only some stable coins were selected as representative. Some tokens, such as [SushiSwap (SUSHI.e)](https://coinmarketcap.com/currencies/sushiswap/) and [SnowBall Finance (SNOB)](https://coinmarketcap.com/currencies/snowball-finance/), even though being significant, were later removed due to gaps in / problems with data collection.

**Data Tables Under the Moralis Server**

The following data tables were constructed under the Moralis server:



## Frontend: UI and Visual Analytics

This section describes the basic design of the user interface (UI) for the Avalytics app and the visual analytics methods used. 
- A separate detailed [tutorial](Tutorial.md) describes the working of the app, explaining step by step, the different screens of the app. 

There are four main screens/interfaces in the app:

- **Dashboard:** Basic information about top tokens on Avalanche C-Chain, including Market Cap (Top 5), top Gainers and Losers.  (under the `Dashboard` tab)
- **Tokens:** Price charts for individual tokens, both as line charts and [candlestick charts](https://www.coingecko.com/buzz/how-to-read-candlestick-charts). The charts can be filtered for selected time period and time resolution.  (under the `Tokens` tab)
- **Multiple Tokens:** Price changes and analytics for multiple tokens at once. Includes timeline visualization, correlation, and bar chart animation. (under the `Multiple Tokens` tab)
- **Pools:** Analytics for  [liquidity pools](https://traderjoexyz.com/pool) in the [TraderJoe](https://traderjoexyz.com) decentralized exchange (DEX). (under the `Pools` tab)


The main library to be used for visualizations are selected as [D3.js](https://d3js.org) and [Flourish Studio](https://flourish.studio/): 
- [D3 Visualization Gallery](https://observablehq.com/@d3/gallery) (JavaScript library for manipulating documents based on data)
- [Flourish Studio](https://flourish.studio/) (JavaScript library and platform for creating interactive charts, maps, and stories from data)

The following are sample code for the visualizations presented throughout the Avalytics app:

<ul>
  <li>Visualizations for the <b>Dashboard</b> tab</li>
      <ul>
        <li><a href="https://www.d3-graph-gallery.com/graph/line_basic.html" target="_blank">Line chart</a></li>
        <li><a href="https://www.d3-graph-gallery.com/pie" target="_blank">Pie chart</a></li>
      </ul> 
  <li>Visualizations for the <b>Tokens</b> tab</li>
      <ul>
        <li><a href="https://www.d3-graph-gallery.com/graph/line_basic.html" target="_blank">Line chart</a> (to see the token prices over selected time period at a selected time resolution)</li>
        <li><a href="https://observablehq.com/@d3/candlestick-chart" target="_blank">Candlestick chart</a> (to see the token prices over selected time period at a selected time resolution)</li>
      </ul> 
  <li>Visualizations for the <b>Multiple Tokens</b> tab</li>
 <ul>
        <li><a href="https://observablehq.com/@d3/realtime-horizon-chart" target="_blank">Timeline visualization</a> (to analyze daily price changes in selected tokens, where users can see the actual values by holding the cursor above the rectangles)</li>
        <li><a href="https://plnkr.co/edit/RJk5vmROVAJGPHIPutVR?p=preview&preview" target="_blank">Correlogram</a> (to analyze correlation between tokens, calculated based on daily price changes for the last 30 days time period)</li>
        <li><a href="https://app.flourish.studio/templates#template-bar-chart-race" target="_blank">Bar chart race</a> (to analyze change in market cap over time, where native tokens are shown with red and non-native (wrapped) tokens are shown in blue)</li>
  </ul> 
  <li>Visualizations for the <b>Pools</b> tab</li>
     <ul>
     <li><a href="https://observablehq.com/@d3/streamgraph" target="_blank">Stacked area chart / Streamgraph</a> (to analyze changes over time in total value locked (TVL) in liquidity pools within the TraderJoe decentralized exchange (DEX).</li>
     </ul> 
</ul> 
 

## Technology/Tool Stack

- For the **backend data querying and storage**, [Moralis API and server](https://moralis.io) were used.
- For the **backend data processing**, [Python](https://python.org) language and [Pandas](https://pandas.pydata.org/) ML library were used.
- For the **backend cloud service**, [Amazon Web Services (AWS)](https://aws.amazon.com/) was used.
- For the **frontend app**, [React.js](https://reactjs.org/) Javascript library was used. 
- For the **frontend visual analytics**, [D3.js](https://d3js.org/) and [Flourish Studio](https://flourish.studio) Javascript libraries/platofmrs were used. The [D3 Visualization Gallery](https://observablehq.com/@d3/gallery) at [Observable HQ](https://observablehq.com/@d3/) provides sample source codes for all the essential charts of D3.js, including those implemented in Avalytics.
- **Token images** were obtained from [CoinGecko](https://coingecko.com).
- **Task management** was tracked through listing tasks in Google Sheets and entering the progress over time.
- **Communication** was done mainly through a [Discord](https://discord.com) group.

## Related Projects

The main **block explorer** for Avalanche is [SnowTrace](https://snowtrace.io/).

There exist several **Avalanche analytics dashboards** that report/visualize data about the Avalanche network. Some notable ones are the following:
- [DefiLlama](https://defillama.com/chain/Avalanche) is an impressive analytics dashboard, that provides _many_ different types of analyses. While Avalytics implements some novel visual analytics techniques, the scope of analyses in Avalytics, in comparion to DefiLlama, is quite small as of January 2022.
- [Messari](https://messari.io/asset/avalanche) provides insightful report on Avalanche, just as it does for many other blockchains.
- [Apy.vision](https://apy.vision/) provides _very_ extensive analytics reports regarding liquidity pools, including the Avalanche pools.
- [WhaleStats](https://www.whalestats.com/analysis-of-the-top-1000-avalanche-wallets) provides several insights into the Avalanche Whales, using interesting iand innovative visualizations, such as treemaps to display Total holdings of all tokens (except Avalanche). Analyses such as Rich List, AVAX transfers in/out of wallets, Stablecoin transfers in/out of wallets, Most widely held token can be interesting to adopt into the Avalytics app. Treemap visualization can also be implemented within Avalytics, as it is quite informative.
 - [Avax Projects](https://www.avax-projects.com/) is an interesting website that provides detailed and up-to-date information on projects and tokens on the Avalanche blockchain. Especially the categories in this website can be used for categorizing the tokens in Avalytics.
 
In addition to the above analytics websites/apps that report on Avalanche, several other **analytics dashboards for other blockchains**, can be a source of inspiration and ideas, in developing Avalytics into the future:
- [Glassnode Studio](https://studio.glassnode.com) is one of the most extensive analytics platforms in the blockchain world. While Glassnode currently does not generate reports on Avalanche, its reports for its selected chains are formidable.
- [Bloks](https://bloks.io/dapps) is an inspiring block explorer for the EOS blockchain, with extensive analytics provided at the speed of light. This project can be source of many ideas to be implemented within Avalytics.
- [Crypto.com DeFi Dashboard - Gas Fees:](https://crypto.com/defi/dashboard/gas-fees) This online service displays not only the Ethereum gas fees but also the gas fees for different swap pairs.
- [EthereumPrice.org:](https://ethereumprice.org/gas/) This website displays gas price over time, and time of the day. Especially the visualization of fees through heat map is impressive. 
- [Matteo Leibowitz's Dune Analytics Dashboards:](https://dune.xyz/MatteoLeibowitz/uniswap-community) This rich collection of dashboards display several statistics for the Uniswap ecosystem. 
- [ChainCrunch](https://dashboard.chaincrunch.cc/public/dashboard/cc7a0d94-7f70-46f4-aae4-2f8810430931#theme=night) is a basic dashboard for Solana.

## Other Resources: 

**Data Extraction and Processing**

The following resources/libraries can be used for data extraction or for getting inspiration/ideas:

- [GraphQL](https://graphql.org/2) (to index/extract data from Avalanche)
- [BitQuery](https://graphql.bitquery.io/ide) (to query data from blockchains, currently not supporting Avalanche)
- [Flipside Crypto](https://app.flipsidecrypto.com) (to query data from blockchains)

**API and App-Development Platforms**

- [Alchemy](https://www.alchemy.com/) is an alternative platform to develop blockchain applications rapidly. However, as of January 2022, it does not support Avalanche.
- [Infura](https://infura.io/) is an alternative platform, which does not support Avalanche as of January 2022.

## Future Plans for Avalytics

- Users can be allowed to download source data used in creating the visualizations, possibly at a minor charge, opening the door for revenue and datanomics.
- A full-fledged datanomics model can be created, that will enable monetization from the Avalytics app. Basic ideas include selling the source data, computed data, and dynamically constructed full reports, in return for AVAX tokens. If a token is to be issued for Avalytics, a full-fledged (tokenomics design)[https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=blockchain+tokenomics&btnG=] is [needed](https://maxyampolsky.medium.com/how-to-design-tokenomics-for-your-cryptocurrency-the-basics-of-creating-your-token-9a0375cb9479), which mitigates against different types of technical, legal, economic, and social risks, and ensures economics value and growth. For example, in both datanomics and tokenomics design, it is important to make sure not to distribute tokens to users randomly, as this may be [labeled as lottery and sued by some users](https://cryptobriefing.com/a-guy-put-10-ethereum-defi-app/).
- Users can be allowed to select other [color palettes](https://www.crazyegg.com/blog/website-color-palettes/) for the visualizations. These palettes can include pallets that are suitable for [color blindness](https://www.color-blindness.com/), similar to [R packages for color blindness](https://www.datanovia.com/en/blog/top-r-color-palettes-to-know-for-great-data-visualization/). Another possibility is to use [color palettes inspired by photos of nature](https://sarahrenaeclark.com/color-palettes/).
- Several other analyses categories and types can be added to the app. These extensions include analysis of Whales, MemPools, Bridges, and other networks, in comparison and conjunction with Avalanche C-Chain. There can even be detailed analytics for Avalanche Dapps, as the top Dapp directory, [DappRadar](https://dappradar.com/s) -as of January 2022- does not list [Avalanche Dapps](https://dappradar.com/search/avalanche), returning empty results page.
- Sliding news tickers can be added, at least as a footer in the main Dashboard screen, that would display prices of Avalanche C-Chain tokens dynamically. Several Javascript libraries can be used to this end, including [react-ticker](https://github.com/AndreasFaust/react-ticker), [dynamic-marquee](https://github.com/tjenkinson/dynamic-marquee), and [react-native-text-ticker](https://github.com/deanhet/react-native-text-ticker).
- Several other calculations, especially with respect to volatiliy, and specifically the ["VIX Index"](https://youtu.be/56gI9mMOczw) and other [Fear & Greed indicators](https://money.cnn.com/data/fear-and-greed/) calculations can be done through collecting more data with other API, such as [Binance Market Data endpoints](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#market-data-endpoints) and [FTX Grouped Orderbooks](https://docs.ftx.com/#grouped-orderbooks).
- Other visual analytics methods can be implemented using alternative libraries, including Python visualization/animation/storytelling libraries (such as [seaborn](https://seaborn.pydata.org/examples/index.html)) whose output may be displayed on the frontend within Avalytics.
- Advanced data analytics methods and [machine learning (ML)](https://www.coursera.org/collections/machine-learning) algorithms, including predictive and even prescriptive analytics, can be implemented within Avalytics into the future, using some of the [top data science software libraries](https://towardsdatascience.com/8-booming-data-science-libraries-you-must-watch-out-in-2022-cec2dbb42437).
- Computed statistics can be published on [ChainLink](Chainlink: https://chain.link) and other oracles. One simple example would be publishing the correlation between AVAX and ETH (or WETH.e) prices as feeds.
- Computed statistics can be published as webhooks, allowing RPA tools to connect to these hooks and do many interesting things, including automated notification/signal/alter push messages to social media.
- On the documentation side, the developed code, especially the Javascript code can be visually documented using [SmartDraw's Automated Class Diagrams Extensions](htpps://www.smartdraw.com/developers/extensions/class-diagram.htm)
- On the documentation side, the documentation can be put into a better format using [GitBook](https://gitbook.com), just like the [GitBook documentation of TraderJoe](https://docs.traderjoexyz.com/main/welcome/master).

<hline>
</hline>
