#!/usr/bin/bash

source venv/bin/activate

echo "calculating hourly price summary..."
python local/GetSummary.py Token1Hour
echo "hourly price summary done!"

echo "calculating current summary..."
python local/LatestTokenData.py
echo "current summary updated!"

deactivate