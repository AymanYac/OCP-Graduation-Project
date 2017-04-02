import string
import datetime
import sys
from pdftables import get_tables
import openpyxl
import glob
import os
import warnings
import timeit
warnings.filterwarnings("ignore")

def fill(wb,matrix,title,n,postmonth,postday):
	wb.create_sheet(title = title)
	sheet = wb.get_sheet_by_name(title)
	flag1=flag2=flag3=0
	res = get_tables(matrix)
	sheet['A1']="Label Index"
	sheet['B1']="Date"
	sheet['C1']="Low Price"
	sheet['D1']="High Price"
	sheet['E1']="Average"
	sheet['F1']="Unit"
	sheet['G1']="Frequency"
	i=2
	if n == 14:
		n=-1
	elif n == 7:
		n=-2
	else:
		n=-3
	for subres in res:
		for subsubres in subres:
			if 'Fob prices' in subsubres:
				flag1=1
				aux = "FOB "
			if 'Delivered prices' in subsubres:
				flag2=1
				aux = "CFR "
			if 'Prices' in subsubres[0]:
				flag3=1
			if flag1 == 1 and flag3 !=1:
				if subsubres[0] not in ["","Of which:","Fob prices","Delivered prices"] and ("-" not in subsubres[0] or "Tampa" in subsubres[0] or "Gulf" in subsubres[0]):
					if "Yuzhnyy" in subsubres[0]:
						country="Yuzhnyy"
					elif "Southeast Asia" in subsubres[0]:
						country="SE Asia"
					elif "(duty paid" in subsubres[0]:
						country=subsubres[0].split(" ")[0]+" "+subsubres[0].split(" ")[1]+" (duty paid)"
					elif "(duty unpaid" in subsubres[0]:
						country=subsubres[0].split(" ")[0]+" "+subsubres[0].split(" ")[1]+" (duty unpaid)"
					elif "Gulf" in subsubres[0] and "Tampa" not in subsubres[0]:
						country="US Gulf (MS, LA, TX)"
					elif "Tampa" in subsubres[0] and "Gulf" not in subsubres[0]:
						country="Tampa"
					else:
						country=subsubres[0]
					sheet['A'+str(i)]="Ammonia "+aux+country
					sheet['B'+str(i)]=(str(postday)+"/"+str(postmonth)+"/2016").strip("'")
					if "-" in subsubres[n]:
						sheet['C'+str(i)]=float(subsubres[n].strip('*').split('-')[0].strip("'"))
						sheet['D'+str(i)]=float(subsubres[n].strip('*').split('-')[1].strip("'"))
					else:
						sheet['C'+str(i)]=sheet['D'+str(i)]=float(subsubres[n].strip('*').strip("'"))
					sheet['E'+str(i)]="=AVERAGE(C"+str(i)+":D"+str(i)+")"
					sheet['F'+str(i)]="$/T"
					sheet['G'+str(i)]="Weekly"
					i+=1


def main(argv):
	wb = openpyxl.Workbook()
	wb.remove_sheet(wb.active)
	start = timeit.default_timer()
	i=0
	j = len(glob.glob(sys.argv[1]+"/*.pdf"))
	for pdf_name in sorted(glob.glob(sys.argv[1]+"/*.pdf")):
		matrix = open(pdf_name, "rb")
		day=pdf_name.split("/")[1].split(".")[0].split("_")[-1].split("-")[2]
		month=pdf_name.split("/")[1].split(".")[0].split("_")[-1].split("-")[1]
		if i!= j-1:
			post = datetime.datetime(2016,int(month),int(day)) - datetime.timedelta(days = 14)
			month = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"][post.month-1]
			day = post.day
			title=str(day)+" "+month
			fill(wb,matrix,title,14,post.month,post.day)
		else:
			post = datetime.datetime(2016,int(month),int(day)) - datetime.timedelta(days = 14)
			month = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"][post.month-1]
			day = post.day
			title=str(day)+" "+month
			fill(wb,matrix,title,14,post.month,post.day)
			day=pdf_name.split("/")[1].split(".")[0].split("_")[-1].split("-")[2]
			month=pdf_name.split("/")[1].split(".")[0].split("_")[-1].split("-")[1]
			post = datetime.datetime(2016,int(month),int(day)) - datetime.timedelta(days = 7)
			month = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"][post.month-1]
			day = post.day
			title=str(day)+" "+month
			fill(wb,matrix,title,7,post.month,post.day)
			day=pdf_name.split("/")[1].split(".")[0].split("_")[-1].split("-")[2]
			month=pdf_name.split("/")[1].split(".")[0].split("_")[-1].split("-")[1]
			post = datetime.datetime(2016,int(month),int(day))
			month = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"][post.month-1]
			day = post.day
			title=str(day)+" "+month
			fill(wb,matrix,title,0,post.month,post.day)
		i+=1
	wb.save("out.xlsx")
	stop = timeit.default_timer()
	print stop - start

if __name__ == '__main__':
    main(sys.argv)
