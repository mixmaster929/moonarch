# import requests
# from bs4 import BeautifulSoup

# # URL of the webpage to scrape
# url = 'https://eth.moonarch.app/token/0xa8b229f7045192750a6aa25ccb088a196e713cd9'

# # Send a GET request to the webpage
# response = requests.get(url)

# # Check if the request was successful
# if response.status_code == 200:
#     # Parse the HTML content using BeautifulSoup
#     soup = BeautifulSoup(response.content, 'html.parser')

#     # Find the div with class 'token-check-message'
#     token_check_message = soup.find('div', class_='token-check-message')

#     # Extract and print the text content
#     if token_check_message:
#         print(token_check_message.text.strip())
#     else:
#         print('The token-check-message class was not found.')
# else:
#     print(f'Failed to retrieve the webpage. Status code: {response.status_code}')


# from selenium import webdriver
# from selenium.webdriver.common.by import By

# # Path to your WebDriver executable
# driver_path = ''

# # URL of the webpage to scrape
# url = 'https://eth.moonarch.app/token/0xa8b229f7045192750a6aa25ccb088a196e713cd9'

# # Create a new instance of the Chrome driver
# driver = webdriver.Chrome()

# # Navigate to the webpage
# driver.get(url)

# # Locate the element with class 'token-check-message'
# try:
#     # Wait for the element to be present
#     token_check_message = driver.find_element(By.CLASS_NAME, 'token-check-message')
    
#     # Extract and print the text content
#     print(token_check_message.text)
# except Exception as e:
#     print(f'An error occurred: {e}')

# # Close the browser
# driver.quit()


from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# Path to your WebDriver executable
# driver_path = 'path/to/chromedriver'

# URL of the webpage to scrape
url = 'https://eth.moonarch.app/token/0xa8b229f7045192750a6aa25ccb088a196e713cd9'

# Create Chrome options to ignore SSL certificate errors
# chrome_options = Options()
# chrome_options.add_argument('--ignore-certificate-errors')
# chrome_options.add_argument('--ignore-ssl-errors')

# Create a new instance of the Chrome driver with options
driver = webdriver.Chrome()

# Navigate to the webpage
driver.get(url)

# Wait for the element to be present and get the text
# try:
    # Wait for up to 10 seconds for the element to be present
token_check_message = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, 'token-check-message check-alert'))
)

# Extract and print the text content
print(token_check_message.text + "=======================")
# except Exception as e:
#     print(f'An error occurred: {e}')
# finally:
#     # Close the browser
#     print('test')
    # driver.quit()    
