#!/bin/bash
sudo mkdir -p /usr/local/share/texmf/tex/latex/rustyle/latex_beamer_ru
wget http://www.cs.ru.nl/P.Vullers/downloads/latex_beamer_ru.zip
sudo unzip latex_beamer_ru.zip -d /usr/local/share/texmf/tex/latex/rustyle/latex_beamer_ru
rm latex_beamer_ru.zip
sudo chmod -R a+rX /usr/local/share/texmf/tex/latex/rustyle
sudo texhash
URL="https://www.sharelatex.com/templates/536e933280bde19571bf9c33/v/1/zip?name=Radboud%20University%20Beamer%20(version%201)"
wget $URL -O Radboud\ University\ Beamer\ \(version\ 1\).zip
unzip Radboud\ University\ Beamer\ \(version\ 1\).zip -d .
rm Radboud\ University\ Beamer\ \(version\ 1\).zip
wget http://www.maths.dundee.ac.uk/dfg/latex/textpos.sty