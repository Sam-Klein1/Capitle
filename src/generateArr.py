import json

def build_array_from_json(file_path):
    with open(file_path) as file:
        json_data = json.load(file)
        
        data_array = []
        for entry in json_data:
            capital = entry['CapitalName']
            country = entry['CountryName']
            code = entry['CountryCode']
            
            data_array.append(f"'{capital}', ")
        
        return data_array

# Replace 'data.json' with the actual path to your JSON file
json_file_path = '/Users/samkl/repos/Capitle/public/cityData.json'
result_array = build_array_from_json(json_file_path)

# Print the entire array
for entry in result_array:
    print(entry)