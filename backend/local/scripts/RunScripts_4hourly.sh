#!/usr/bin/bash

source venv/bin/activate

echo "calculating daily price summary..."
python local/GetSummary.py Token1Day
echo "daily price summary done!"

echo "calculating 4 hourly price summary..."
python local/GetSummary.py Token4Hour
echo "4 hourly price summary done!"

echo "calculating hourly price summary..."
python local/GetSummary.py Token1Hour
echo "hourly price summary done!"

echo "calculating 30 day token price correlations..."
python local/GetCorrelation.py
echo "correlations done!"

echo "fetching token pair liquidity..."
python local/FetchPairLiquidity.py
echo "token pair liquidity updated!"

deactivate