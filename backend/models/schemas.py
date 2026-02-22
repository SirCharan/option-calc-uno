"""Pydantic request/response models."""

from pydantic import BaseModel, Field


class PricingRequest(BaseModel):
    spot_price: float = Field(..., gt=0)
    strike_price: float = Field(..., gt=0)
    risk_free_rate: float
    volatility: float = Field(..., gt=0)
    time_to_expiry: float = Field(..., gt=0)


class PricingResponse(BaseModel):
    call_price: float
    put_price: float
    greeks: dict


class SpotPriceResponse(BaseModel):
    coin: str
    price_usd: float
    source: str
    timestamp: str


class DvolResponse(BaseModel):
    currency: str
    dvol: float
    dvol_decimal: float
    timestamp: str
