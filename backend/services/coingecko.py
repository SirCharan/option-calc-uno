"""CoinGecko service for fetching crypto spot prices."""

from datetime import datetime, timezone

import httpx


async def get_spot_price(coin_id: str) -> dict:
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {"ids": coin_id, "vs_currencies": "usd"}

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()

    if coin_id not in data or "usd" not in data[coin_id]:
        raise ValueError(f"No price data for '{coin_id}'")

    return {
        "coin": coin_id,
        "price_usd": data[coin_id]["usd"],
        "source": "coingecko",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
