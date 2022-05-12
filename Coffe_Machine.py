MENU = {
    "espresso": {
        "ingredients": {
            "water": 50,
            "milk": 0,
            "coffee": 18,
        },
        "cost": 1.5,
    },
    "latte": {
        "ingredients": {
            "water": 200,
            "milk": 150,
            "coffee": 24,
        },
        "cost": 2.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 250,
            "milk": 100,
            "coffee": 24,
        },
        "cost": 3.0,
    }
}

profit = 0
resources = {
    "water": 300,
    "milk": 200,
    "coffee": 100,
}


def command(cmd):
    if cmd == "report":
        for res in resources:
            print(f"{res.capitalize()}: {resources[res]} ml")
        print(f"Money: $ {profit}")
    elif cmd == "off":
        state_of_machine["on"] = False
    elif cmd == "espresso" or cmd == "latte" or cmd == "cappuccino":
        if check_resources(cmd):
            process_coin(cmd)


def check_resources(order):
    if resources["water"] - MENU[order]["ingredients"]["water"] < 0:
        print(f"There is not enough water for the {order}")
        return False
    elif resources["milk"] - MENU[order]["ingredients"]["milk"] < 0:
        print(f"There is not enough milk for the {order}")
        return False
    elif resources["coffee"] - MENU[order]["ingredients"]["coffee"] < 0:
        print(f"There is not enough coffee for the {order}")
        return False
    else:
        return True


def process_coin(order):
    print("Insert coin: \n")
    quarters = input("How many quarters?: ")
    dimes = input("How many dimes?: ")
    nickles = input("How many nickles?: ")
    pennies = input("How many pennies?: ")
    inserted_coin = (int(quarters) * 0.25) + (int(dimes) * 0.10) + (int(nickles) * 0.05) + (int(pennies) * 0.01)
    if MENU[order]["cost"] - inserted_coin > 0:
        print("Sorry that's not enough money. Money refunded.")
    else:
        global profit
        global resources
        profit += MENU[order]["cost"]
        change = inserted_coin - MENU[order]["cost"]
        resources["water"] -= MENU[order]["ingredients"]["water"]
        resources["milk"] -= MENU[order]["ingredients"]["milk"]
        resources["coffee"] -= MENU[order]["ingredients"]["coffee"]
        if change > 0:
            print(f"Here is $ {round(change,2)} dollars in change")
        print(f"Here is your {order}. Enjoy!")


state_of_machine = {"on": True}
while state_of_machine["on"]:
    users_input = input("What would you like?(espresso/latte/cappuccino)")
    command(users_input)