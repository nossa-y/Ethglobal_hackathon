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
        i = -1
        lecteur_csv = csv.DictReader(fichier) #on suppose que le fichier est un dictionnaire
        n = len(lecteur_csv)
        for i in range (0,n):
            p = 0
            for line in lecteur_csv[p + i % n ] :
                for poid in line:
                    if poid.key() not in chemin:
                        poids.append(poid.value())
                s = min(poids)
                while line.value()[i] != s:
                    i += 1
                chemin.append(line.key()[i]) #voir comment avoir le nom de la blockchain liée à l'indice i
            p += 1
        chemins.append(chemin)

chat GPT corrige

#algo en fonction de ce que l'utilisateur veut 
@app.get
def get_plus_court_chemin(blockchain):
    import chemins
    return


