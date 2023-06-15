import configparser
import pymongo
import pandas as pd
import json

"""
Load the UNICEF Child Labor Index from Excel (.xlsx) into a MongoDB table
This script needs to be run only when the index is updated. It can be run with: "python load_child_labor_index.py"
IMPORTANT: Make sure that the last country listed in the excel sheet is also included! Adapt this script if necessary
Copyright @SustainMind
Tested with: UNICEF Child Labor Index May 2022
"""

EXCEL_FILE = "indices/XLS_Child-labour-database_May-2022.xlsx"
EXCEL_SHEET_NAME = "Child labour"
MONGO_DB_CONFIG_FILE = "db_config.txt"
COLLECTION_NAME = "child_labor"


if __name__ == "__main__":
    # read MongoDB config
    config = configparser.ConfigParser()   
    config.read(MONGO_DB_CONFIG_FILE)

    # get database
    print("Connecting to database", config["MONGO_DB"]["database"], "with client", config["MONGO_DB"]["client"])
    client = pymongo.MongoClient(config["MONGO_DB"]["client"])
    db = client[config["MONGO_DB"]["database"]]
    print("Connection successful!")

    child_labor_index = db[COLLECTION_NAME]

    # delete all documents in collection (if it isn't already empty)
    child_labor_index.delete_many({})

    print("Loading excel sheet: \"" + str(EXCEL_SHEET_NAME) + "\"")
    excel_data = pd.read_excel(EXCEL_FILE, sheet_name=EXCEL_SHEET_NAME, skiprows=lambda n: n<=10 or n>212, usecols=[0,1], header=None, names=["Country", "Child Labor Percentage"])
    excel_data["Child Labor Percentage"] = excel_data["Child Labor Percentage"].apply(lambda x: "-1" if x=="-" else x)
    excel_data["Child Labor Percentage"] = excel_data["Child Labor Percentage"].astype(float)
    print("Excel sheet loaded!")

    data = json.loads(excel_data.to_json(orient="records"))

    print("Inserting country scores into MongoDB...")
    x = child_labor_index.insert_many(data)
    print("Successfully inserted", str(len(x.inserted_ids)), "countries and their child labor percentages into MongoDB!")