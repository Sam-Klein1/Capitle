import cfscrape
import requests
from bs4 import BeautifulSoup

cities = ["Abu Dhabi", "Algiers", "Amman", "Amsterdam", "Ankara", "Antananarivo", "Apia", "Ashgabat", "Asmara", "Astana", "Asuncion", "Athens", "Baghdad", "Baku", "Bamako", "Bandar Seri Begawan", "Bangkok", "Bangui", "Banjul", "Basseterre", "Beijing", "Beirut", "Belgrade", "Belmopan", "Berlin", "Bern", "Bishkek", "Bissau", "Bogota", "Brasilia", "Bratislava", "Brazzaville", "Bridgetown", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Cairo", "Canberra", "Caracas", "Castries", "Chisinau", "Conakry", "Copenhagen", "Dakar", "Damascus", "Dhaka", "Dili", "Djibouti", "Dodoma", "Dublin", "Dushanbe", "Edinburgh", "Helsinki", "Honiara", "Islamabad", "Jakarta", "Jerusalem", "Kabul", "Kampala", "Kathmandu", "Kiev", "Kingston", "Kingstown", "Kinshasa", "Kuala Lumpur", "Kuwait City", "Kyiv", "La Paz", "Libreville", "Lilongwe", "Lima", "Lisbon", "Ljubljana", "Lome", "London", "Luanda", "Lusaka", "Luxembourg", "Madrid", "Majuro", "Amman", "Malabo", "Male", "Managua", "Manama", "Manila", "Maputo", "Maseru", "Mbabane", "Melekeok", "Mexico City", "Minsk", "Mogadishu", "Monaco", "Monrovia", "Montevideo", "Moroni", "Moscow", "Muscat", "Nairobi", "Nassau", "Nay Pyi Taw", "NDjamena", "New Delhi", "Nicosia", "Niamey", "Nouakchott", "Nuku'alofa", "Oslo", "Ottawa", "Palikir", "Panama City", "Paramaribo", "Paris", "Podgorica", "Port Louis", "Port Moresby", "Port of Spain", "Port Vila", "Praia", "Pristina", "Pyongyang", "Quito", "Rabat", "Reykjavik", "Riga", "Riyadh", "Rome", "Roseau", "San Jose", "San Marino", "San Salvador", "Sana'a", "Santiago", "Santo Domingo", "Sarajevo", "Skopje", "Sofia", "Stockholm", "Sucre", "Suva", "Taipei", "Tallinn", "Tarawa Atoll", "Tashkent", "Tbilisi", "Tegucigalpa", "Tehran", "Thimphu", "Tirana", "Tokyo", "Tripoli", "Tunis", "Ulaanbaatar", "Vaduz", "Valletta", "Vatican City", "Victoria", "Vienna", "Vientiane", "Vilnius", "Warsaw", "Washington, D.C.", "Wellington", "Windhoek", "Yaounde", "Yerevan", "Zagreb"]

scraper = cfscrape.create_scraper()

for city in cities: 

    #for each city, search for it on pixabay
    search_query = city.replace(" ", "+")
    url = f"https://pixabay.com/images/search/{search_query}/"

    response = scraper.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the container of
    # the specfifc image on the screen
    container = soup.find('div', class_='container--MwyXl')
    if container:

        # Find the image
        img_container = soup.find('a', class_="link--WHWzm")

        img_url = img_container["href"]
        response = scraper.get(img_url) 
        soup = BeautifulSoup(response.text, "html.parser")

        # Find the container of
        # the specfifc image on the screen
        container = soup.find('div', class_='container--3Mtk4')
        img_container = container.find("img")
        img_url = img_container["src"]
        response = requests.get(img_url)
        with open(f"{city}.jpg", "wb") as file:
            file.write(response.content)
        print(f"Downloaded image for {city}")










        # Iterate over the nested divs to find the first img element
        # for div in nested_divs:
        #     if div.find('img'):
        #         img = div.find('img')
        #         image_url = img['src']
        #         response = requests.get(image_url)
        #         with open(f"{city}.jpg", "wb") as file:
        #             file.write(response.content)
        #         print(f"Downloaded image for {city}")
        #         break  # Exit the loop after finding the first image
