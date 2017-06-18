Write-Host "Telechargement de Python ..."
wget https://www.python.org/ftp/python/2.7.12/python-2.7.12.msi -OutFile installer.msi
.\installer.msi
Write-Host "Appuyez sur un bouton APRES la fin de l'installation de Python ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python27\;C:\Python27\Scripts\", "User")
Write-Host "Telechargement du code source OCP_IFA_XSL_Parser ..."
New-Item -ItemType directory -Path .\Source_Code
New-Item -ItemType directory -Path .\Target
wget dl.dropboxusercontent.com/s/fdz00iu3xiyo0nm/csvTotemplate.py?dl=0 -OutFile .\Source_Code\csvTotemplate.py
wget dl.dropboxusercontent.com/s/q9ykggi9f3dz76f/IfaXslParser.py?dl=0 -OutFile .\Source_Code\IfaXslParser.py
wget dl.dropboxusercontent.com/s/5fqkwj7ryh3byxd/NotCumulatedToCumulated.py?dl=0 -OutFile .\Source_Code\NotCumulatedToCumulated.py
wget dl.dropboxusercontent.com/s/w4klib8vhyiz2xc/map.csv?dl=0 -OutFile .\Source_Code\map.csv
wget dl.dropboxusercontent.com/s/plr6nprc8m4hqh2/Parser.ps1?dl=0 -OutFile Parser.ps1
Write-Host "Compilation des dépendances ..."
pip install openpyxl
Write-Host "Installation terminée, appuyez sur une touche ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")