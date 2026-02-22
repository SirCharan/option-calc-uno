"""Black-Scholes option pricing model for European options."""

import numpy as np
from scipy.stats import norm


def d1(S: float, K: float, r: float, sigma: float, T: float) -> float:
    return (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))


def d2(S: float, K: float, r: float, sigma: float, T: float) -> float:
    return d1(S, K, r, sigma, T) - sigma * np.sqrt(T)


def call_price(S: float, K: float, r: float, sigma: float, T: float) -> float:
    d1_val = d1(S, K, r, sigma, T)
    d2_val = d2(S, K, r, sigma, T)
    return S * norm.cdf(d1_val) - K * np.exp(-r * T) * norm.cdf(d2_val)


def put_price(S: float, K: float, r: float, sigma: float, T: float) -> float:
    d1_val = d1(S, K, r, sigma, T)
    d2_val = d2(S, K, r, sigma, T)
    return K * np.exp(-r * T) * norm.cdf(-d2_val) - S * norm.cdf(-d1_val)


def delta_call(S: float, K: float, r: float, sigma: float, T: float) -> float:
    return norm.cdf(d1(S, K, r, sigma, T))


def delta_put(S: float, K: float, r: float, sigma: float, T: float) -> float:
    return norm.cdf(d1(S, K, r, sigma, T)) - 1.0


def gamma(S: float, K: float, r: float, sigma: float, T: float) -> float:
    d1_val = d1(S, K, r, sigma, T)
    return norm.pdf(d1_val) / (S * sigma * np.sqrt(T))


def vega(S: float, K: float, r: float, sigma: float, T: float) -> float:
    """Vega per 1% change in volatility."""
    d1_val = d1(S, K, r, sigma, T)
    return S * norm.pdf(d1_val) * np.sqrt(T) * 0.01


def theta_call(S: float, K: float, r: float, sigma: float, T: float) -> float:
    """Theta per day for calls."""
    d1_val = d1(S, K, r, sigma, T)
    d2_val = d2(S, K, r, sigma, T)
    term1 = -(S * norm.pdf(d1_val) * sigma) / (2.0 * np.sqrt(T))
    term2 = -r * K * np.exp(-r * T) * norm.cdf(d2_val)
    return (term1 + term2) / 365.0


def theta_put(S: float, K: float, r: float, sigma: float, T: float) -> float:
    """Theta per day for puts."""
    d1_val = d1(S, K, r, sigma, T)
    d2_val = d2(S, K, r, sigma, T)
    term1 = -(S * norm.pdf(d1_val) * sigma) / (2.0 * np.sqrt(T))
    term2 = r * K * np.exp(-r * T) * norm.cdf(-d2_val)
    return (term1 + term2) / 365.0


def rho_call(S: float, K: float, r: float, sigma: float, T: float) -> float:
    """Rho per 1% change in interest rate for calls."""
    d2_val = d2(S, K, r, sigma, T)
    return K * T * np.exp(-r * T) * norm.cdf(d2_val) * 0.01


def rho_put(S: float, K: float, r: float, sigma: float, T: float) -> float:
    """Rho per 1% change in interest rate for puts."""
    d2_val = d2(S, K, r, sigma, T)
    return -K * T * np.exp(-r * T) * norm.cdf(-d2_val) * 0.01


def calculate_option(S: float, K: float, r: float, sigma: float, T: float) -> dict:
    """Calculate all option prices and Greeks."""
    if T <= 0:
        raise ValueError("Time to expiry must be positive")
    if sigma <= 0:
        raise ValueError("Volatility must be positive")
    if S <= 0 or K <= 0:
        raise ValueError("Spot and strike prices must be positive")

    return {
        "call_price": round(float(call_price(S, K, r, sigma, T)), 6),
        "put_price": round(float(put_price(S, K, r, sigma, T)), 6),
        "greeks": {
            "call_delta": round(float(delta_call(S, K, r, sigma, T)), 6),
            "put_delta": round(float(delta_put(S, K, r, sigma, T)), 6),
            "gamma": round(float(gamma(S, K, r, sigma, T)), 6),
            "vega": round(float(vega(S, K, r, sigma, T)), 6),
            "call_theta": round(float(theta_call(S, K, r, sigma, T)), 6),
            "put_theta": round(float(theta_put(S, K, r, sigma, T)), 6),
            "call_rho": round(float(rho_call(S, K, r, sigma, T)), 6),
            "put_rho": round(float(rho_put(S, K, r, sigma, T)), 6),
        },
    }
