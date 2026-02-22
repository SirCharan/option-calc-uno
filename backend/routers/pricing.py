"""Router for option pricing calculations."""

from fastapi import APIRouter, HTTPException

from models.schemas import PricingRequest, PricingResponse
from services.black_scholes import calculate_option

router = APIRouter()


@router.post("/api/price", response_model=PricingResponse)
async def price_option(request: PricingRequest) -> PricingResponse:
    try:
        result = calculate_option(
            S=request.spot_price,
            K=request.strike_price,
            r=request.risk_free_rate,
            sigma=request.volatility,
            T=request.time_to_expiry,
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))

    return PricingResponse(**result)
