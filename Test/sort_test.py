from selenium import webdriver
import time
import random

driver = webdriver.Chrome('/Users/khuselbayar/Desktop/tester/chromedriver')

expenses = []

for i in range(50):
    expense_name = f"Expense_{i+1}"
    expense_price = round(random.uniform(1, 1000), 2)  
    expenses.append((expense_name, expense_price))
try:
    driver.get('http://localhost:3000') 

    label_input = driver.find_element_by_id('label_input')
    price_input = driver.find_element_by_id('price_input')
    for expense in expenses:
        label_input.send_keys(expense[0]) 
        price_input.send_keys(expense[1])        
        price_input.submit()
        time.sleep(1)

    expense_table = driver.find_element_by_id('expense_table')
    rows = expense_table.find_elements_by_tag_name('tr')

    values_found = False
    prices = []
    for row in rows:
        cells = row.find_elements_by_tag_name('td')
        label_cell = cells[0]  # First column contains the label
        price_cell = cells[1]  # Second column contains the price
        prices.append(float(price_cell.text))
        if label_cell.text == 'Groceries' and price_cell.text == '50':
            values_found = True
            break

    assert values_found, "Error: Value was not inserted correctly"
    print("Test 1 passed: Expenses are sorted by price amount")

    sorted_prices = sorted(prices)
    assert prices == sorted_prices, "Expenses are not sorted by price amount"
    print("Test 2 passed: Expenses are sorted by price amount")

finally:
    driver.quit()