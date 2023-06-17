import json
from os.path import exists

def build_array_from_json(file_path):
    with open(file_path) as file:
        json_data = json.load(file)
        
        data_array = []
        for entry in json_data:
            #check if .jpg of city exitsts
            #if it DOES NOT, then add it to the arr
            capital = entry['CapitalName']
            file_exists = exists(f"./assets/{capital}.jpg")
            if not file_exists: 
                data_array.append(f"{capital}, ")
        
        return sorted(data_array)

# Replace 'data.json' with the actual path to your JSON file
json_file_path = '/Users/samkl/repos/Capitle/public/cityData.json'
result_array = build_array_from_json(json_file_path)

# Print the entire array
for entry in result_array:
    print(entry)