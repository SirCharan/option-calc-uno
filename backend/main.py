"""FastAPI application for the crypto options calculator."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.market_data import router as market_data_router
from routers.pricing import router as pricing_router

app = FastAPI(
    title="Crypto Options Calculator",
    description="Black-Scholes option pricing with live market data for crypto assets.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pricing_router)
app.include_router(market_data_router)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok"}
