import sys
import csv


def decumulate(trade, file, trades_writer):
    q1 = 0
    q2 = 0
    q3 = 0
    f = open(file, 'rb')
    trades_reader = csv.DictReader(f)
    trades_writer.writerow((trade['Importing countries'], trade['Region (IFA)'], trade['Region (OCP)'],
                            trade['Exporting countries'], trade['Product'], trade['Year'], trade['Quarter'],
                            trade['Code'],
                            trade['kT'], trade['P2O5/Product'], 'Cumulated',
                            trade['AGG/DET/ANN']))
    if trade['kT'].replace(' ', '') == '-':
        trades_writer.writerow((trade['Importing countries'], trade['Region (IFA)'], trade['Region (OCP)'],
                                trade['Exporting countries'], trade['Product'], trade['Year'], trade['Quarter'],
                                trade['Code'],
                                trade['kT'], trade['P2O5/Product'], 'Not Cumulated',
                                trade['AGG/DET/ANN']))
    else:
        if trade['Quarter'] == 'Q2':
            for row in trades_reader:
                if row['Year'] == trade['Year'] and row['Importing countries'] == trade['Importing countries'] and row[
                    'Exporting countries'] == trade['Exporting countries'] and row['Product'] == trade['Product'] and row['P2O5/Product'] == trade['P2O5/Product']:
                    if row['Quarter'] == 'Q1':
                        if row['kT'] == '-':
                            q1 = 0

                        else:
                            q1 = row['kT'].replace(' ', '')
                        break
            if float(trade['kT']) - float(q1) < 0:
                print("ImpCount : " + row['Importing countries'] + " || ExpCount : " + trade[
                    'Exporting countries'] + "\n" + str(float(trade['kT'])) + " - " + str(float(q3)))
            trades_writer.writerow((trade['Importing countries'], trade['Region (IFA)'], trade['Region (OCP)'],
                                    trade['Exporting countries'], trade['Product'], trade['Year'], trade['Quarter'],
                                    trade['Code'],
                                    "%.1f" % (float(trade['kT']) - float(q1)), trade['P2O5/Product'], 'Not Cumulated',
                                    trade['AGG/DET/ANN']))
        elif trade['Quarter'] == 'Q3':
            for row in trades_reader:
                if row['Year'] == trade['Year'] and row['Importing countries'] == trade['Importing countries'] and row[
                    'Exporting countries'] == trade['Exporting countries'] and row['Product'] == trade['Product'] and row['P2O5/Product'] == trade['P2O5/Product']:
                    if row['Quarter'] == 'Q2':
                        if row['kT'] == '-':
                            q2 = 0
                        else:
                            q2 = row['kT'].replace(' ', '')
                        break
            if float(trade['kT']) - float(q2) < 0:
                print( "ImpCount : " + row['Importing countries'] + " || ExpCount : " + trade[
                    'Exporting countries'] + "\n" + str(float(trade['kT'])) + " - " + str(float(q2)))
            trades_writer.writerow((trade['Importing countries'], trade['Region (IFA)'], trade['Region (OCP)'],
                                    trade['Exporting countries'], trade['Product'], trade['Year'], trade['Quarter'],
                                    trade['Code'],
                                    "%.1f" % (float(trade['kT']) - float(q2)), trade['P2O5/Product'], 'Not Cumulated',
                                    trade['AGG/DET/ANN']))
        elif trade['Quarter'] == 'Q4':
            for row in trades_reader:
                if row['Year'] == trade['Year'] and row['Importing countries'] == trade['Importing countries'] and row[
                    'Exporting countries'] == trade['Exporting countries'] and row['Product'] == trade['Product'] and row['P2O5/Product'] == trade['P2O5/Product']:
                    if row['Quarter'] == 'Q3':
                        if row['kT'] == '-':
                            q3 = 0
                        else:
                            q3 = row['kT'].replace(' ', '')
                        break
            if float(trade['kT']) - float(q3) < 0:
                print("ImpCount : " + row['Importing countries'] + " || ExpCount : " + trade[
                    'Exporting countries'] + "\n" + str(float(trade['kT'])) + " - " + str(float(q3)))
            trades_writer.writerow((trade['Importing countries'], trade['Region (IFA)'], trade['Region (OCP)'],
                                    trade['Exporting countries'], trade['Product'], trade['Year'], trade['Quarter'],
                                    trade['Code'],
                                    "%.1f" % (float(trade['kT']) - float(q3)), trade['P2O5/Product'], 'Not Cumulated',
                                    trade['AGG/DET/ANN']))
        elif trade['Quarter'] == 'Q1':
            # print(trade['kT'])
            trades_writer.writerow((trade['Importing countries'], trade['Region (IFA)'], trade['Region (OCP)'],
                                    trade['Exporting countries'], trade['Product'], trade['Year'], trade['Quarter'],
                                    trade['Code'],
                                    trade['kT'].replace(' ', ''), trade['P2O5/Product'], 'Not Cumulated',
                                    trade['AGG/DET/ANN']))


def main(argv):
    file = argv[1]
    dest = argv[2]
    f1 = open(dest, 'wb')
    f = open(file, 'rb')
    trades = csv.DictReader(f)
    trades_writer = csv.writer(f1)
    trades_writer.writerow(
        ('Importing countries', 'Region (IFA)', 'Region (OCP)', 'Exporting countries', 'Product', 'Year',
         'Quarter', 'Code', 'kT', 'P2O5/Product', 'Cumulated/Not Cumulated', 'AGG/DET/ANN'))
    for trade in trades:
        decumulate(trade, file, trades_writer)


if __name__ == '__main__':
    main(sys.argv)
