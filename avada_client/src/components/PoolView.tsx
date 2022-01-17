import SteamGraph from "./charts/steamChart/SteamGraph";
import React from "react";


const PoolView = (props:any) => {

    const data = [{year: 1880, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1881, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1882, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1883, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1884, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1885, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1886, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1887, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1888, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1889, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1890, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1891, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1892, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1893, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1894, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1895, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1896, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1897, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1898, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1899, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1900, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1901, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1902, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1903, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1904, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1905, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1906, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1907, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1908, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1909, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1910, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1911, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1912, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},


    ]



    return (<SteamGraph data={data}/>)

}


export default PoolView;