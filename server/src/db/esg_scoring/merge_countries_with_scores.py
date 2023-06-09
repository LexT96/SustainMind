import configparser
import pymongo
import pandas as pd

"""
This script merges information about countries with their esg indices. All indices are transformed on a scale from 0 (no risk) to 100 (very high risk)
Make sure the WJP, SlaveryIndex, EPI and CountryRegions collections exist before running this script
Copyright @SustainMind
"""

MONGO_DB_CONFIG_FILE = "index_loaders/db_config.txt"
COLLECTION_NAME_CHILD_LABOR = "child_labor"
COLLECTION_NAME_WJP = "WJP"
COLLECTION_NAME_SLAVERY = "SlaveryIndex"
COLLECTION_NAME_EPI = "EPI"
COLLECTION_NAME_COUNTRY_REGION = "country_regions"
COLLECTION_NAME_MERGED = "countries"


def child_labor_to_risk(child_labor_data):
    """
    Convert a child labor data record into a risk score
    """


def wjp_to_risks(wjp_scores):
    """
    Convert a single WJP score object to a dict of SustainMind ESG scores
    @param wjp_scores: JSON WJP object
    @return risks: Map of SustainMind ESG scores and their values (-1: not enough data)
    """
    risks = {"Child labor or forced labor": -1, }


if __name__ == "__main__":
    # read MongoDB config
    config = configparser.ConfigParser()   
    config.read(MONGO_DB_CONFIG_FILE)

    # get database
    print("Connecting to database", config["MONGO_DB"]["database"], "with client", config["MONGO_DB"]["client"])
    client = pymongo.MongoClient(config["MONGO_DB"]["client"])
    db = client[config["MONGO_DB"]["database"]]
    print("Connection successful!")

    # check if collections exist
    wjp = db[COLLECTION_NAME_WJP]
    if not wjp.find_one():
        raise ValueError("Collection", COLLECTION_NAME_WJP, "is empty! Please load the WJP index before merging the scores!")

    slavery_index = db[COLLECTION_NAME_SLAVERY]
    if not slavery_index.find_one():
        raise ValueError("Collection", COLLECTION_NAME_SLAVERY, "is empty! Please load the slavery index before merging the scores!")

    epi = db[COLLECTION_NAME_EPI]
    if not epi.find_one():
        raise ValueError("Collection", COLLECTION_NAME_EPI, "is empty! Please load the EPI before merging the scores!")

    country_region = db[COLLECTION_NAME_COUNTRY_REGION]
    if not country_region.find_one():
        raise ValueError("Collection", COLLECTION_NAME_COUNTRY_REGION, "is empty! Please load the Country-Region collection before merging the scores!")
    

    # delete collection if it already exists
    merged_indices = db[COLLECTION_NAME_MERGED]
    merged_indices.delete_many({})
    

    country_list = []
    # iterate over all countries in country_region database
    for country in country_region.find({}, {'_id': 0, 'name': 1, 'alpha-2': 1, 'alpha-3': 1, 'region': 1, 'sub-region': 1}):

        iso_code = country_region["alpha-2"]

        wjp_scores = wjp.find_one({"Country Code": iso_code})
        
        wjp_to_risks(wjp_scores)

        country_list.append(country)
        print(country_list)
        raise ValueError()