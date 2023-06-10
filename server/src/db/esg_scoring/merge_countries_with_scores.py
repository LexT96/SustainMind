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


# define mapping between countries that don't have matching names
child_labor_country_mappings = {
    'Virgin Islands (British)': 'British Virgin Islands',
    'Korea (Democratic People\'s Republic of)': 'Democratic People\'s Republic of Korea',
    'Congo, Democratic Republic of the': 'Democratic Republic of the Congo',
    'Korea, Republic of': 'Republic of Korea',
    'Moldova, Republic of': 'Republic of Moldova',
    'Palestine, State of': 'State of Palestine',
    'United Kingdom of Great Britain and Northern Ireland': 'United Kingdom',
    'Tanzania, United Republic of': 'United Republic of Tanzania',
    'United States of America': 'United States'
}


slavery_index_country_mappings = {
    'Bolivia (Plurinational State of)': 'Bolivia',
    'Congo, Democratic Republic of the': 'Democratic Republic of the Congo',
    'Iran (Islamic Republic of)': 'Iran', 
    '': 'Kosovo', # not an entry in counry databse -> # TODO add Kosovo
    'Lao People\'s Democratic Republic': 'Lao PDR', 
    'Moldova, Republic of': 'Moldova', 
    'Korea (Democratic People\'s Republic of)': 'North Korea', 
    'Congo': 'Republic of the Congo', 
    'Russian Federation': 'Russia', 
    'Korea, Republic of': 'South Korea', 
    'Syrian Arab Republic': 'Syria', 
    'Taiwan, Province of China': 'Taiwan', 
    'Tanzania, United Republic of': 'Tanzania', 
    'Turkey': 'Türkiye', 
    'United Kingdom of Great Britain and Northern Ireland': 'United Kingdom', 
    'Venezuela (Bolivarian Republic of)': 'Venezuela'
}


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
            score = index_to_risk_score(0, 3, 10, 30, percentage)
        result["Child Labor Percentage"] = percentage
    else:
        result["Child Labor Percentage"] = -1

    result["Risk: Child Labor"] = score
    return result


def slavery_index_to_risk(slavery_index_data):
    """
    Convert a slavery index data record into a risk score
    """
    result = {}
    score = -1

    if slavery_index_data:
        prevalence = slavery_index_data["Prevalence"]
        score = index_to_risk_score(0, 5, 10, 30, prevalence)
        result["Modern Slavery Prevalence"] = prevalence
    else:
        result["Modern Slavery Prevalence"] = -1

    result["Risk: Human Trafficking"] = score
    return result


def wjp_to_risks(wjp_scores):
    """
    Convert a single WJP score object to a dict of SustainMind ESG scores
    @param wjp_scores: JSON WJP object
    @return risks: Map of SustainMind ESG scores and their values (-1: not enough data)
    """
    risks = {"Forced labor": -1, }


def test_conversion(index, country_region, index_name, risk_name, mapping=None):
    # check if all countries of an index could be matched
    countries_index = index.find({}, {"_id": 0, "Country": 1})
    countries_index_list = [c["Country"] for c in countries_index]
    countries_all = country_region.find({risk_name: {"$ne": -1}}, {"_id": 0, "name": 1})
    countries_all_list_ = [c["name"] for c in countries_all]
    if mapping:
        countries_all_list = [(mapping[c] if c in mapping.keys() else c) for c in countries_all_list_]
    else:
        countries_all_list = countries_all_list_
    countries_unmatched = [c for c in countries_index_list if c not in countries_all_list]
    if countries_unmatched == []:
        print("All countries in", index_name, "index could be matched!")
    else:
        print("The following countries in the", index_name, "index couldn't be matched:", countries_unmatched)


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
    child_labor_index_len = child_labor_index.count_documents({})
    print("cl entries:", child_labor_index_len)
    if child_labor_index_len == 0:
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

        # append child labor index
        cl_country_name = country_name
        if country_name in child_labor_country_mappings:
            cl_country_name = child_labor_country_mappings[country_name]
            print("Child labor index: Mapped '" + country_name + "' to '" + cl_country_name + "'")
        child_labor_data = child_labor_index.find_one({"Country": cl_country_name})
        for risk, score in child_labor_to_risk(child_labor_data).items():
            country[risk] = score


        # append modern slavery index
        si_country_name = country_name
        if country_name in slavery_index_country_mappings:
            si_country_name = slavery_index_country_mappings[country_name]
            print("Slavery index: Mapped '" + country_name + "' to '" + si_country_name + "'")
        slavery_index_data = slavery_index.find_one({"Country": si_country_name})
        for risk, score in slavery_index_to_risk(slavery_index_data).items():
            country[risk] = score

        #wjp_scores = wjp.find_one({"Country Code": iso_code})
        #wjp_to_risks(wjp_scores)

        country_list.append(country)

    print("Inserting merged indices into collection", COLLECTION_NAME_MERGED)
    merged_indices.insert_many(country_list)
    print("Succesfully inserted collection", COLLECTION_NAME_MERGED)

    test_conversion(child_labor_index, merged_indices, "Child Labor", "Risk: Child Labor", mapping=child_labor_country_mappings)
    test_conversion(slavery_index, merged_indices, "Slavery", "Risk: Human Trafficking", mapping=slavery_index_country_mappings)
    #print(country_list)

    print("Merging completed!")