import Moralis from "moralis";


export const getBlockFromDate = async (date: string) => {

    const block = await Moralis.Web3API.native.getDateToBlock({chain:"avalanche",date:date});
    return block;

}


export const getIsoDate = async () => {
    const yourDate = new Date();
    return yourDate.toISOString().split('T')[0]
}