![Avalytics Logo](./img/AvalyticsLogoMini.png) ![Avalytics Logo](./img/AvalyticsLogo1Mini.png)

## Background: Avalanche, C-Chain, Moralis, and Avalytics

[Avalanche](https://www.avax.network) is the one of the most popular Layer 1 blockchain networks in the world, which has unique advantages over other blockchain. Most importantly, Avalanche is one of the top Layer 1 networks which has resolved the ["blockchain trilemma"](https://www.gemini.com/cryptopedia/blockchain-trilemma-decentralization-scalability-definition), by achieving decentralization, scalability, and security at the same time.

One of the fundamental concepts in Avalanche is that Avalanche contains [three built-in blockchains](https://docs.avax.network/learn/platform-overview/): Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain). The X-Chain is mainly for minting smart digital assets as tokens. P-Chain is the meta-blockchain that coordinates all the components of Avalanche. C-Chain, an instance of the Ethereum Virtual Machine, is the chain where smart contracts are created and deployed. The focus of Avalytics is the Avalanche C-Chain and data regarding the tokens and transactions on the C-Chain.

The first blockchain with smart contract capability was Ethereum, yet the Ethereum network, as of January 2022, is still not scalable to achieve its full vision, specifically due to lack of scalibity and the associated expensive transaction fees. In blockchains with smart contracts, "gas fee" refers to the fee paid to the blockchain network for evaluating, executing, and recording a transaction. The gas fees are paid in the same token as the network, such as Ethereum tokens being used for transactions on the Ethereum blockchain, and Avalanche AVAX tokens being used for transactions on Avalanche C-Chain. The gas fees can change significantly over time, depending on the congestion of the network, level of liquidity, trade volume, and many other factors. One can learn more about gas fees, especially for Ethereum, from this [Hackernoon tutorial article](https://hackernoon.com/ethereum-gas-fees-for-dummies-oj8135nn), this [BeInCrypto tutorial article](https://beincrypto.com/learn/ethereum-gas-fees-lowest/) and this [Amberdata tutorial article](https://amberdata.io/docs/guides/ethereum-gas-price-and-predictions/). 

A clear advantage of Avalanche over Ethereum and most other Layer 1 blockchain networks is the very low gas fees needed for Avalanche transactions. This is due to Avalanche readily having achieved scalability, in addition to decentralization and security, as mentioned earlier. Another advantage of Avalanche is that tokens from other networks, can be imported into Avalanche as ["wrapped tokens" through bridges](https://docs.avax.network/learn/avalanche-bridge-faq/), and transacted on the Avalanche C-Chain, at much lower cost. For example, Ethereum ETH tokens on the Ethereum network can be wrapped by the Avalanche C-Chain as WETH.e tokens and transacted on the Avalanche network, together with native Avalanche tokens (tokens minted and transacted natively in Avalanche) such as Avalaunch (XAVA) and Pangolin (PNG). As of January 2022, Avalanche is also one of the blockchain ecosystems with [fastest growing developer bases](https://youtu.be/AjwAw4S7CXY), participation and engagement. Due to these listed advantages and many others, Avalanche is positioned as a contender to achieve its [primary vision](https://www.youtube.com/watch?v=yaXR3kwSS9c) of digitally tokenizing all the assets in the world.

The main motivation for Avalytics was the absence of a dedicated analytics dashboard for the Avalanche ecosystem. Given the experience and expertise of the team members with data analytics, addressing this gap was identified as the target of the Avalytics project.

The [Moralis+Avalanche Hackathon]() already requires that the app for the hackathon is developed using Moralis and Avalanche. Yet, Moralis would still be a viable alternative for developing the Avalytics app even if this requirement was not there. Building apps with Moralis consists of much [simpler steps](https://www.youtube.com/watch?v=S60H2GMRaRY) and can relieve developers from many of the burdens of blockchain programming, such as RPC node setup, indexing, signature verification, and smart contract synchronization. Moralis can help developers significantly in reducing product-to-market time and improving product quality. Moralis allows blockchain developers to stand on the shoulders of blockchain giants and gurus, and rapidly find a place in this new and exciting industry.

There exist multiple block explorers and dashboards that provide data and insights on the Avalanche blockchain. Notable systems include [SnowTrace](https://snowtrace.io/), developed by [AvaLabs](https://www.avalabs.org/), and [WhaleStats](https://www.whalestats.com/analysis-of-the-top-1000-avalanche-wallets), which provides several insights into the Avalanche Whales. While these tools are excellent, we, as the developer team, did _not_ encounter a website/app that provides the utility and insights we had in mind. The Avalytics project thus involves the design, development, deployment, and communication of such an analytics dashboard app, with many firsts in comparion to its peers.

**Index**

1. **Background**
2. [Unique Value Offerings](UniqueValueOfferings.md)
3. [Design Principles](DesignPrinciples.md)
4. [System Architecture](SystemArchitecture.md)
5. [Backend: Data under Moralis](Backend.md)
6. [Frontend: UI and Visual Analytics](Frontend.md)
7. [Technology/Tool Stack](TechnologyStack.md)
8. [Related Projects](RelatedProjects.md)
9. [Other Resources](OtherResources.md)
10. [Future Plans for Avalytics](FuturePlans.md)

<hline></hline>

[Back to Main GitHub Page](../README.md) | [Back to Documentation Index Page](Documentation.md)
