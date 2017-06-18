Write-Host "Parsing ..."
$x =(get-date -f MM-dd-yyyy_HH_mm_ss)
mkdir $x
cd $x
python ..\Source_Code\IfaXslParser.py ..\Target
Write-Host "Parsing Termin� !"
Write-Host "Formatage ..."
Copy-Item ..\Source_Code\map.csv .\map.csv
python ..\Source_Code\csvToTemplate.py -v -f ..\$x
Remove-Item .\map.csv
Write-Host "Formatage Termin� !"
Write-Host "Decumulation ...Peut prendre plusieurs minutes..."
python ..\Source_Code\NotCumulatedToCumulated.py out.csv FINAL_DECUM.csv
Rename-Item .\out.csv ONLY_CUM.csv
Write-Host "Decumulation Termin�e !"
Write-Host "Operations termin�es, r�sultats enregistr�s dans le repertoire $($x)"
Write-Host "Appuyez sur une touche pour quitter"
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
