from fastapi import FastAPI
from model import poids, poids_mod


app = FastAPI()

from database import(
    chemins, plus_court_chemin, edit_transac, add_transac, delete_transac

)

@app.get("/transac/")
def get_transac(user_blockchain : poids, wanted_blockchain : poids):
    solution = plus_court_chemin(user_blockchain, wanted_blockchain)
    return solution

@app.post("/transac/")
def add_transac(blockchain : poids):
    res = add_transac(blockchain)
    print("transactions added")
    return res

@app.put("/transac/{blockchain}")
def edit_transac(blockchain : poids, blockchain_modif : poids_mod):
    return edit_transac(blockchain, blockchain_modif)


@app.delete("transac/{blockchain}")
def delete_transac(blockchain):
    return delete_transac(blockchain)
