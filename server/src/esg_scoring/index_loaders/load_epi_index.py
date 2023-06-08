import configparser
import pymongo
import pandas as pd

"""
Load the Environmental Performance Index from .csv into a MongoDB table
This script needs to be run only when the index is updated (once a year). It can be run with: "python load_epi_index.py"
The EPI website offers to download different versions of the dataset. This script works with the EPI Results as CSV
Copyright @SustainMind
Tested with: EPI 2022
"""

CSV_FILE = "indices/epi2022results.csv"
MONGO_DB_CONFIG_FILE = "db_config.txt"
COLLECTION_NAME = "EPI"


def insert_country_scores(collection, csv):
    """
    Insert the WJP factor scores of the countries into the collection 
    """

    relevant_infos = {
        "country": "Country",
        "EPI.new": "EPI score",
        "BDH.new": "Biodiversity & Habitat",
        "ECS.new": "Ecosystem Services",
        "FSH.new": "Fisheries",
        "ACD.new": "Acidification",
        "AGR.new": "Agriculture",
        "WRS.new": "Water Resources",
        "AIR.new": "Air Quality",
        "H2O.new": "Sanitation & Drinking Water",
        "HMT.new": "Heavy Metals",
        "WMG.new": "Waste Management",
        "CCH.new": "Climate Change"
    }

    print("Inserting country scores into MongoDB...")

    # check if all factors are present in the csv file
    for factor in relevant_infos.keys():
        if not factor in csv.columns:
            raise ValueError("The scheme of the table seemingly has changed! Factor", factor, "couldn't be found!")
    
    score_list = []
    for _, row in csv.iterrows():
        entry = {}
        for factor, factor_name in relevant_infos.items():
            entry[factor_name] = row[factor]
        score_list.append(entry)

    x = collection.insert_many(score_list)
    print("Successfully inserted", str(len(x.inserted_ids)), "countries and their EPI scores into MongoDB!")


if __name__ == "__main__":
    # read MongoDB config
    config = configparser.ConfigParser()   
    config.read(MONGO_DB_CONFIG_FILE)

    # get database
    print("Connecting to database", config["MONGO_DB"]["database"], "with client", config["MONGO_DB"]["client"])
    client = pymongo.MongoClient(config["MONGO_DB"]["client"])
    db = client[config["MONGO_DB"]["database"]]
    print("Connection successful!")

    epi = db[COLLECTION_NAME]

    # delete all documents in collection (if it isn't already empty)
    epi.delete_many({})

    print("Loading CSV file: \"" + str(CSV_FILE) + "\"")
    data = pd.read_csv(CSV_FILE)
    print("CSV file loaded!")

    insert_country_scores(epi, data)