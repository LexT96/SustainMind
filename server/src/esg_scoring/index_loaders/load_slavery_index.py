import configparser
import pymongo
import pandas as pd

"""
Load the Global Slavery Index from Excel (.xlsx) into a MongoDB table
This script needs to be run only when the index is updated (once a year). It can be run with: "python load_slavery_index.py"
IMPORTANT: Update the sheet name when running the script!
Copyright @SustainMind
Tested with: WJP 2022
"""

EXCEL_FILE = "indices/2023-Global-Slavery-Index-Data.xlsx"
EXCEL_SHEET_NAME = "GSI 2023 summary data"
MONGO_DB_CONFIG_FILE = "db_config.txt"
COLLECTION_NAME = "SlaveryIndex"


def insert_country_scores(collection, excel_sheet):
    """
    Insert the WJP factor scores of the countries into the collection 
    """

    print("Inserting country scores into MongoDB...")

    # make sure that collection is formatted correctly
    if excel_sheet.columns[0] != "Country":
        raise ValueError("The formatting of the provided excel sheet isn't as expected! Column 'Country' couldn't be found!")

    if excel_sheet.columns[3] != "Estimated prevalence of modern slavery per 1,000 population":
        raise ValueError("The formatting of the provided excel sheet isn't as expected! Column 'Estimated prevalence of modern slavery per 1,000 population' couldn't be found!")
    
    score_list = []
    for _, row in excel_sheet.iterrows():
        if pd.notna(row[3]):
            entry = {"Country": row[0], "Prevalence": row[3]}
            score_list.append(entry)

    x = collection.insert_many(score_list)
    print("Successfully inserted", str(len(x.inserted_ids)), "countries and their Slavery Index scores into MongoDB!")


if __name__ == "__main__":
    # read MongoDB config
    config = configparser.ConfigParser()   
    config.read(MONGO_DB_CONFIG_FILE)

    # get database
    print("Connecting to database", config["MONGO_DB"]["database"], "with client", config["MONGO_DB"]["client"])
    client = pymongo.MongoClient(config["MONGO_DB"]["client"])
    db = client[config["MONGO_DB"]["database"]]
    print("Connection successful!")

    slavery_index = db[COLLECTION_NAME]

    # delete all documents in collection (if it isn't already empty)
    slavery_index.delete_many({})

    print("Loading excel sheet: \"" + str(EXCEL_SHEET_NAME) + "\"")
    excel_data = pd.read_excel(EXCEL_FILE, sheet_name=EXCEL_SHEET_NAME, skiprows=2)
    print("Excel sheet loaded!")

    insert_country_scores(slavery_index, excel_data)