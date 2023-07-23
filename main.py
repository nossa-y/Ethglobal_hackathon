from fastapi import FastAPI
from model import poids, poids_mod


app = FastAPI()



from database import(
    plus_court_chemin, edit_transac, create_transac, delete_transac
)

@app.get("/transac/")
def get_transac(user_blockchain : poids, wanted_blockchain : poids):
    solution = plus_court_chemin(user_blockchain, wanted_blockchain)
    return solution

@app.post("/transac/")
def add_transac(blockchain : poids):
    res = create_transac(blockchain)
    return {"message":"ajouté!"}

@app.put("/transac/{nom}")
def update_transac(nom : str, blockchain_modif : poids):
    return edit_transac(nom, blockchain_modif)

@app.delete("transac/{nom}")
def delete_transac(nom : str):
    return delete_transac(nom)
