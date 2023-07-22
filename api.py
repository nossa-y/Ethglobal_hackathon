from fastapi import FastAPI
from pydantic import BaseModel

class poids(BaseModel):
    btc : float
    eth : float
    ltc : float
    xrp : float

class poids_mod(BaseModel):
    btc : float = None
    eth : float = None
    ltc : float = None
    xrp : float = None

app = FastAPI()

@app.get("/poids/")
def get_transac(blockchain : poids):
    return blockchain

"""@app.post("/transac/{id}")
def edit_transac(id, blockchain : poids_mod):
    if poids_mod.btc is not None:
        blockchain[id].btc = poids"""
