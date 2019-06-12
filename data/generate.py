""" This scrips takes the worldcities.csv file from 
https://simplemaps.com/data/world-cities and generates a new CSV to be used on
our CloudSearch instance.
"""

from typing import List, TextIO, TypeVar
import csv, json


def main():
    csv_file: TextIO
    csv_file_export: TextIO
    with open('data.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        
        column_names = next(csv_reader)
        
        places = []

        for row in csv_reader:
            row_dict = {}
            i = 0
            n = len(row)
            d = {}
            while i < n:
                if len(row[i]) > 0:
                    d[column_names[i]] = row[i]
                i += 1
            places.append(d)
            
        for place in places:
            if 'Phone' in place:
                place['Phone'] = place['Phone'].replace(' ', '')
            place['Coordinates'] = [float(s) for s in place['Coordinates'].split(',')]
            place['Number'] = int(place['Number'])
        
        print(json.dumps({'places': places}, sort_keys=True, ensure_ascii=False))


if __name__ == '__main__':
    main()