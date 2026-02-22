"""Router for live market data (spot prices and DVOL)."""

from fastapi import APIRouter, HTTPException, Query

from models.schemas import DvolResponse, SpotPriceResponse
from services.coingecko import get_spot_price
from services.deribit import get_dvol

router = APIRouter()


@router.get("/api/spot-price", response_model=SpotPriceResponse)
async def spot_price(
    coin: str = Query("bitcoin", description="CoinGecko coin id"),
) -> SpotPriceResponse:
    try:
        data = await get_spot_price(coin)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch spot price: {exc}")
    return SpotPriceResponse(**data)


@router.get("/api/dvol", response_model=DvolResponse)
async def dvol(
    currency: str = Query("BTC", description="Currency code (BTC, ETH)"),
) -> DvolResponse:
    try:
        data = await get_dvol(currency)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch DVOL: {exc}")
    return DvolResponse(**data)
