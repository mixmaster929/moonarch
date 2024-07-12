from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# Use the Xvfb virtual display
from pyvirtualdisplay import Display

# Start the virtual display
display = Display(visible=0, size=(1920, 1080))
display.start()

# Set up the ChromeDriver
options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--headless')

url = 'https://eth.moonarch.app/token/0xa8b229f7045192750a6aa25ccb088a196e713cd9'

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get(url)

token_check_messages = WebDriverWait(driver, 100).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, 'token-check-message check-alert'))
)

# for message in token_check_messages:
print(token_check_messages.text + "=======================")

driver.quit()

# Stop the virtual display
display.stop()
