from pydantic import BaseModel

class poids(BaseModel):
    nom : str
    btc : float
    eth : float
    ltc : float
    xrp : float

class poids_mod(BaseModel):
    nom : str
    btc : float = None
    eth : float = None
    ltc : float = None
    xrp : float = None

un_dico = {
    "btc":{
        "nom" : "btc",
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 2,
        "xrp" : 3,
    },
    "eth":{
        "nom" : "eth",
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 2,
        "xrp" : 3,
    },
    "ltc":{
        "nom" : "ltc",
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 1,
        "xrp" : 3,
    },
    "xrp":{
        "nom" : "xrp",
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 2,
        "xrp" : 1
    }

}