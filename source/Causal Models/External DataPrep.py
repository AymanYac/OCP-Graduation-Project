import csv
input_file = csv.DictReader(open("a80e6c0f-6f35-4527-8868-76b81cd23eb4_Data.csv"))
csvwriter = csv.DictWriter(outfile, delimiter=',')
current= "AFG"
for row in input_file:
	if row["CC"]!=AFG:
		current=row["CC"]
	else:
		csvwriter