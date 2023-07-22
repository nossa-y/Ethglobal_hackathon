import csv

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

un_dico = {
    "btc":{
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 2,
        "xrp" : 3,
    },
    "eth":{
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 2,
        "xrp" : 3
    },
    "ltc":{
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 1,
        "xrp" : 3
    },
    "xrp":{
        "btc" : 0.5,
        "eth" : 1,
        "ltc" : 2,
        "xrp" : 1
    }

}

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



