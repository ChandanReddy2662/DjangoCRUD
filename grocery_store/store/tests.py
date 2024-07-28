notes = {
    1000: 10,
    500: 10,
    200: 10,
    100: 10
}

MAX = 10
AMOUNT = 1300
total_notes = 0
while notes[100] != 0 and total_notes < MAX and AMOUNT > 0:
    AMOUNT -= 100
    notes[100] -= 1
    total_notes += 1

while notes[200] != 0 and total_notes < MAX and AMOUNT > 0:
    AMOUNT -= 200
    notes[200] -= 1
    total_notes += 1
print(total_notes)