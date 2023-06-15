import configparser
import pymongo
import pandas as pd

"""
Load the World Justice Project (WJP) Index from Excel (.xlsx) into a MongoDB table
This script needs to be run only when the index is updated (once a year). It can be run with: "python load_wjp_index.py"
IMPORTANT: Update the sheet name when running the script!
Copyright @SustainMind
Tested with: WJP 2022
"""

EXCEL_FILE = "indices/FINAL_2022_wjp_rule_of_law_index_HISTORICAL_DATA_FILE.xlsx"
EXCEL_SHEET_NAME = "WJP ROL Index 2022 Scores"
MONGO_DB_CONFIG_FILE = "db_config.txt"
COLLECTION_NAME = "WJP"


def get_relevant_rows(first_column):
    """
    This function returns the indices of the relevant rows in the excel sheet
    """
    relevant_infos = {
        "Country Code": -1,
        "WJP Rule of Law Index: Overall Score": -1,
        "Factor 1: Constraints on Government Powers": -1,
        "Factor 2: Absence of Corruption": -1, 
        "Factor 3: Open Government": -1, 
        "Factor 4: Fundamental Rights": -1,
        "4.1 Equal treatment and absence of discrimination": -1,
        "4.7 Freedom of assembly and association is effectively guaranteed": -1,
        "4.8 Fundamental labor rights are effectively guaranteed": -1,
        "Factor 5: Order and Security": -1, 
        "Factor 6: Regulatory Enforcement": -1, 
        "Factor 7: Civil Justice": -1,
        "7.2 Civil justice is free of discrimination": -1,
        "Factor 8: Criminal Justice": -1
    }
    
    for i in range(len(first_column)):
        cell = first_column[i]
        if cell in relevant_infos.keys():
            relevant_infos[cell] = i

    # check if all factors are present in the excel sheet
    for factor, row in relevant_infos.items():
        if row == -1:
            raise ValueError("The scheme of the table seemingly has changed! Factor", factor, "couldn't be found!")
        
    return relevant_infos


def insert_country_scores(collection, excel_sheet, relevant_infos):
    """
    Insert the WJP factor scores of the countries into the collection 
    """

    print("Inserting country scores into MongoDB...")

    score_list = []
    for country in excel_sheet.columns[1:]:
        entry = {"Country": country}
        scores = excel_sheet[country]
        for factor, row in relevant_infos.items():
            entry[factor] = scores[row]
        score_list.append(entry)

    x = collection.insert_many(score_list)
    print("Successfully inserted", str(len(x.inserted_ids)), "countries and their WJP scores into MongoDB!")


if __name__ == "__main__":
    # read MongoDB config
    config = configparser.ConfigParser()   
    config.read(MONGO_DB_CONFIG_FILE)

    # get database
    print("Connecting to database", config["MONGO_DB"]["database"], "with client", config["MONGO_DB"]["client"])
    client = pymongo.MongoClient(config["MONGO_DB"]["client"])
    db = client[config["MONGO_DB"]["database"]]
    print("Connection successful!")

    wjp = db[COLLECTION_NAME]

    # delete all documents in collection (if it isn't already empty)
    wjp.delete_many({})

    print("Loading excel sheet: \"" + str(EXCEL_SHEET_NAME) + "\"")
    excel_data = pd.read_excel(EXCEL_FILE, sheet_name=EXCEL_SHEET_NAME)
    relevant_rows = get_relevant_rows(excel_data["Country"])
    print("Excel sheet loaded!")

    insert_country_scores(wjp, excel_data, relevant_rows)