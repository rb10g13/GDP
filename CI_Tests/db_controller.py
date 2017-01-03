from pymongo import MongoClient


def insert_test_result(ci_number, sound_data, date):
    client = MongoClient()
    db = client['GDP']
    collection = db['CI_tests']

    if collection.find({'_id' : ci_number}).count() == 0:
        # If the NHS number was not previously found, inserts a new document for that num
        collection.insert({'_id' : ci_number,
                           'tests' : [ {
                               'date' : date,
                               'data' : sound_data
                            } ]
                           })
    else:
        # Otherwise appends the latest test to the array of stored tests
        collection.update({'_id' : ci_number},
                          {'$push': {'tests' :
                                         {'date' : date,
                                          'data' : sound_data}
                                          }
                            })

    client.close()


def get_initial_test(ci_number):
    client = MongoClient()
    db = client['GDP']
    collection = db['CI_tests']

    if collection.find({'_id' : ci_number}).count() == 0:
        return None
    else:
        # Assumes the first stored is the initial test --- for now this is true
        return list(collection.find({'_id' : ci_number}, {'_id':0, 'tests':1}).next()['tests'])[0]

    client.close()


