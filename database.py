from model import poids, poids_mod, un_dico
from pymongo.mongo_client import MongoClient

import csv
import pymongo

#client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client.
collection = database.

fichier = "chemin-vers-le-fichier"
def chemins(fichier):
    global chemins
    chemins = []
    p = 0
    #liste de plus courts chemins
    with open(fichier, 'r') as fichier:
        poids = []
        chemin = []
        s = 0
        i = -1
        lecteur_csv = csv.DictReader(fichier) #on suppose que le fichier est un dictionnaire
        n = len(lecteur_csv)
        p = 0
        for i in range (0,n):
            for line in lecteur_csv[p + i % n ] : #lecture du fichier à partir de la ligne p, arrivée à la fin, on repart du début du doc jusqu'à la ligne p-1
                for poid in line:
                    if poid.key() not in chemin: #on vérifie que poid n'est pas dasn chemin pour ne pas tourner en rond
                        poids.append(poid.value())
                m = min(poids)
                while line.value()[i] != m: #on cherche le minimum des chemins
                    i += 1
                s += line.value()[i]
                chemin.append(line.key()[i])
                p += 1
        L = [chemin,s]
    chemins.extend(L) #attention chemin sera de la forme [[[btc,eth,xrp],4],[[btc,xrp],2]]


#algo en fonction de ce que l'utilisateur veut 
def plus_court_chemin(user_blockchain, wanted_blockchain): #blockchain de depaart, blockchain d'arrivée
    best_chemins = []
    for chemin in chemins:
        if user_blockchain == chemin.key()[0] and wanted_blockchain in chemin:
            best_chemins.append(chemin) #on a tout les blockchain tq chemin_de_depart = blockchain de l'utilisateur, blockchain d'arrivée = blockchain voulue
    L = []
    for i in best_chemins:
        L.append(i[-1]) #on obtient la liste de tous les poids
    m = min(L)
    q = 0
    while best_chemins[q][-1] != m: #recherche du chemin de poids minimal
        q += 1
    soluce = best_chemins[q]
    return soluce

def add_transac(blockchain : poids):
    document = blockchain
    result = collection.insert_one(document)
    return document

def edit_transac(blockchain : poids, blockchain_modif : poids_mod):
    if poids_mod.btc is not None:
        blockchain.btc = blockchain_modif.btc
    if poids_mod.eth is not None:
        blockchain.eth = blockchain_modif.eth
    if poids_mod.ltc is not None:
        blockchain.ltc = blockchain_modif.ltc
    if poids_mod.xrp is not None:
        blockchain.xrp = blockchain_modif.xrp
    collection.update_one({"nom" : blockchain.name}, {"$set": {"btc": blockchain.btc,
                                                               "eth": blockchain.eth,
                                                               "ltc": blockchain.ltc,
                                                               "xrp": blockchain.xrp}})
    document = collection.find_one({"nom": blockchain.nom})
    return document


def delete_transac(nom : str):
    collection.delete_one({"nom": nom})

