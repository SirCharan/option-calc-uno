"""Deribit service for fetching DVOL (implied volatility index)."""

import time
from datetime import datetime, timezone

import httpx


async def get_dvol(currency: str) -> dict:
    now_ms = int(time.time() * 1000)
    url = "https://www.deribit.com/api/v2/public/get_volatility_index_data"
    params = {
        "currency": currency.upper(),
        "start_timestamp": now_ms - 3_600_000,
        "end_timestamp": now_ms,
        "resolution": 3600,
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        body = response.json()

    data_points = body.get("result", {}).get("data", [])
    if not data_points:
        raise ValueError(f"No DVOL data for {currency.upper()}")

    last_point = data_points[-1]
    dvol_value = last_point[4]  # close

    return {
        "currency": currency.upper(),
        "dvol": dvol_value,
        "dvol_decimal": dvol_value / 100.0,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
