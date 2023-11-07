import requests
import datetime
import os

# This variable is responsible for deciding which stations are important.
# There are weights assigned to each station, and the stations with the highest weights are the ones that are more important.
# Their values will matter more when calculating the average rainfall.
stations = {
    "S104": 0.75,
    "S210": 1,
    "S211": 0.5,
    "S227": 0.25
}
RAINFALL_THRESHOLD = 3.5

def run_action(rainfall_amount):
    with open("record.csv", "a+") as f:
        f.seek(0)
        if f.read(1) == "":
            f.write("datetime,rainfall\n")
        f.write(f"{datetime.now()},{rainfall_amount}\n")
    
    # Use sudo wisely: if you don't need it, don't use it.
    os.system("sudo action.sh")

URL = "https://api.data.gov.sg/v1/environment/rainfall"
response = requests.get(URL)
data = response.json()

station_values = {}
for station in data["items"][0]["readings"]:
    if station["station_id"] in stations.keys():
        station_values[station["station_id"]] = station["value"]

weighted_rainfall = sum(station_values[station] * weight for station, weight in stations.items()) / sum(stations.values())
print(f"Station values: {station_values}\nWeighted average: {weighted_rainfall}")

if weighted_rainfall > RAINFALL_THRESHOLD:
    run_action(weighted_rainfall)
