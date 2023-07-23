from model import poids, poids_mod, un_dico
from pymongo.mongo_client import MongoClient

import csv
import pymongo

client = MongoClient("mongodb://localhost:27017")
#client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client["blockchain"]
collection = database["transaction"]
"""
#exemple(chat):
# Inserer un document
data = {"nom": "John", "âge": 30, "pays": "France"}
inserted_doc = collection.insert_one(data)
print("ID du document inséré", inserted_doc.inserted_id)

# Trouver un document dans la collection
query = {"nom": "John"}
result = collection.find_one(query)
print(result)

# Mettre à jour un document dans la collection
query = {"nom": "John"}
new_data = {"$set": {"âge": 31}}
collection.update_one(query, new_data)

# Supprimer un document de la collection
query = {"nom": "John"}
collection.delete_one(query)

#fermeture de la connexion quand finit avec mongo db
"""




fichier = "chemin-vers-le-fichier"
def all_chemins(fichier):
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
#il faudrait mettre tous les chemins dasn la base de donnée, dans une autre que transac car pas la même forme

def obtenir_chemin(nom1: str, nom2: str):
    result = collection.find_one({"nom": nom1})
    if result and nom2 in result["chemin"]:
        chemin = result["chemin"]
        start_index = chemin.index(nom1)
        end_index = chemin.index(nom2)
        if start_index < end_index:
            path = chemin[start_index:end_index + 1]
            return path
    return None


def take_chemin(user_blockchain, wanted_blockchain):
    return plus_court_chemin(user_blockchain, wanted_blockchain) #il faudrait que le chemin soit dans la base de donnée, qu'on prenne cet élément de la base de donnée avec find_one et qu'on le retourne

def create_transac(blockchain : poids):
    blockchain_dict = blockchain.dict()
    result = collection.insert_one(blockchain_dict)
    return {"message": "blockchain a été ajoutée"}

def edit_transac(nom : str, blockchain_modif : poids):
    collection.update_one({"nom" :nom}, {"$set": {"btc": blockchain_modif.btc,
                                                               "eth": blockchain_modif.eth,
                                                               "ltc": blockchain_modif.ltc,
                                                               "xrp": blockchain_modif.xrp}})
    document = collection.find_one({"nom": nom})
    return document


def delete_transac(nom : str):
    collection.delete_one({"nom": nom})
