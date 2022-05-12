import json
import sys

birthday = [{"name": "Denis De Bellis",
            "birthday": "16/12/1992"}]


print("Welcome to the birthday dictionary. We know the birthday of:\n")
with open("birthday.json", "r") as file:
    birthday = json.load(file)
    for i in birthday[:]:
        print(i["name"])
program = True
while program:
    user_input = input("Would you add a birthday or check one?(Digit \"exit\" to stop)\n>>> ")
    if user_input.lower() == "add" or user_input.lower() == "adding":
        name_add = input("Digit his or her name: ")
        birthday_add = input("Digit the birthday (GG/MM/AA): ")
        birthday.append({"name": name_add,
                        "birthday": birthday_add})
        with open("birthday.json", "w") as file:
            json.dump(birthday, file, indent=4)
    elif user_input.lower() == "check" or user_input.lower() == "check one":
        research = input("Who are you looking for?: ")
        with open("birthday.json", "r") as file:
            info = json.load(file)
            for x in info[:]:
                if x["name"] == research:
                    print(x["name"] + "'s birthday is " + x["birthday"])
    elif user_input.lower() == "exit":
        sys.exit()
    else:
        print("please digit a correct command. add,check or exit.")




