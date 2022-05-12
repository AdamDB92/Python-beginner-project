import random
import os
import sys

words_list = []
hangman = [" |\n O\n", "/", "[]","\\", "\n |", "|"]

with open("C:\\Users\\denis\\OneDrive\\Desktop\\sowpods.txt", "r") as file:
    line = file.readline()
    while line:
        words_list.append(line)
        line = file.readline()


def pick_a_word():
    return words_list[random.randint(0, len(words_list) - 1)].strip()


def another_match_question():
    user = input("would you start another match?")
    if user == "yes" or user == "y":
        os.system("exercise_30.py")
    elif user == "no" or user == "n":
        sys.exit()
    else:
        user = input("please digit yes/y or no/n\n")
        if user == "yes" or user_input == "y":
            os.system("exercise_30.py")
        elif user == "no" or user == "n":
            sys.exit()


if __name__ == "__main__":
    print("".join(hangman))
    secret_word = list(pick_a_word())
    guessing_word = list("_"*len(secret_word))
    number_of_mistake = 0
    print("Welcome to Hangman!")
    print("".join(guessing_word))
    letter_guessed = set()
    while True:
        if number_of_mistake == 6:
            print("I'm sorry u have finished the attempts.You lose")
            number_of_mistake = 0
            letter_guessed.clear()
            another_match_question()
        if "".join(secret_word) == "".join(guessing_word):
            print(f"You win with {number_of_mistake}. Good job!\n" + "".join(hangman[:number_of_mistake]))
            letter_guessed.clear()
            another_match_question()
        user_input = input("Guess your letter: ")
        if user_input.upper() in letter_guessed:
            print("You have digit this letter yet. Try another one!")
            continue
        letter_guessed.add(user_input.upper())
        index = 0
        for char in secret_word:
            if user_input.upper() == char:
                guessing_word[index] = user_input.upper()
                index += 1
            else:
                index += 1
        if user_input.upper() not in secret_word:
            print("Incorrect!")
            number_of_mistake += 1
            print("".join(hangman[:number_of_mistake]))
        print("".join(guessing_word))


