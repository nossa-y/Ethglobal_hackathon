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
        chemins.append(chemin,s) #à verifier
un_dico = {
    eth
}

#algo en fonction de ce que l'utilisateur veut 
@app.get
def get_plus_court_chemin(user_blockchain, wanted_blockchain):
    best_chemins = []
    for chemin in chemins:
        if user_blockchain == chemin.key()[0] and wanted_blockchain in chemin:
            best_chemins.append(chemin)
            prendre le chemin tq s est le plus petit



