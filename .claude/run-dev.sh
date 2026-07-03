#!/usr/bin/env bash
export PATH="/home/mint/.nvm/versions/node/v22.12.0/bin:$PATH"
exec npm run dev -- --port 5180 --strictPort
