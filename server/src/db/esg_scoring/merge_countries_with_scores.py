import configparser
import pymongo
import pandas as pd
import numpy as np
from scipy.interpolate import PchipInterpolator

"""
This script merges information about countries and calculates their ESG risk scores. All indices are transformed on a scale from 0 (no risk) to 100 (very high risk)
0-10: Very low risk
10-35: Low risk
35-65: Intermediate risk
65-90: High risk
90-100: Very high risk
-1: No information available
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


def index_to_risk_score(level_0, level_30, level_70, level_100, index_value):
    """
    Convert an index value to a score (between 0 and 100) given defined boundaries for the score conversion
    @param level_0: maximum index value for which a score should be 0
    @param level_30: index value for which a score should be 30
    @param level_70: index value for which a score should be 70
    @param level_100: minimum index value for which a score should be 100
    @param index_value: the index value which is converted to a score
    """
    points = [[0, 0], [level_0, 0], [level_30, 30], [level_70, 70], [level_100, 100], [100, 100]]
    points_without_duplicates = []
    [points_without_duplicates.append(x) for x in points if x not in points_without_duplicates]
    points = np.array(points_without_duplicates)
    interpolator = PchipInterpolator(points[:,0], points[:,1])
    return round(interpolator(index_value).item(), 5)


def child_labor_to_risk(child_labor_data):
    """
    Convert a child labor data record into a risk score
    """
    result = {}
    score = -1

    # check if data is available
    if child_labor_data:
        percentage = child_labor_data["Child Labor Percentage"]
        if percentage == -1:
            score = 0
        else:
            score = index_to_risk_score(0.1, 3, 10, 30, percentage)
        result["Child Labor Percentage"] = percentage
    else:
        result["Child Labor Percentage"] = -1

    result["Risk: Child Labor"] = score
    return result


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
    child_labor_index = db[COLLECTION_NAME_CHILD_LABOR]
    if not child_labor_index.find_one():
        raise ValueError("Collection", COLLECTION_NAME_CHILD_LABOR, "is empty! Please load the UNICEF child labor index before merging the scores!")

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

        country_name = country["name"]
        iso_code = country_region["alpha-2"]

        child_labor_data = child_labor_index.find_one({"Country": country_name})

        for risk, score in child_labor_to_risk(child_labor_data).items():
            country[risk] = score

        #wjp_scores = wjp.find_one({"Country Code": iso_code})
        #wjp_to_risks(wjp_scores)

        country_list.append(country)
    print(country_list)