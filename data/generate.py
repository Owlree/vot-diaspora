""" This scrips takes the worldcities.csv file from 
https://simplemaps.com/data/world-cities and generates a new CSV to be used on
our CloudSearch instance.
"""

from typing import List, TextIO, TypeVar
import csv


def main():
    first_row:List[str] = [
        'city',
        'city_ascii',
        'latlon',
        'country',
        'iso2',
        'iso3',
        'population']

    csv_file: TextIO
    csv_file_export: TextIO
    with open('worldcities.csv') as csv_file:
        with open('worldcities-export.csv', 'w') as csv_file_export:
            csv_reader = csv.reader(csv_file, delimiter=',')
            csv_writer = csv.writer(csv_file_export, delimiter=',')

            csv_writer.writerow(first_row)

            next(csv_reader) # ignore column names

            for row in csv_reader:
                latlon: str = f'{str(row[2])},{str(row[3])}'
                csv_item_type = TypeVar('csv_item_type', int, str)
                city: List[csv_item_type] = [
                    row[0],  # city
                    row[1],  # city_ascii
                    latlon,  # latlon
                    row[4],  # country
                    row[5],  # iso2
                    row[6],  # iso3
                    row[9]]  # population
                csv_writer.writerow(city)


if __name__ == '__main__':
    main()