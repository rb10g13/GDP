#import db_controller


def compare(initial_test, db_values, ci_number):
    difference = []
    for i in range(len(db_values)):
        difference.append(initial_test[i]-db_values[i])

    # TODO - average and return something, depends on what is needed
    print(difference)
