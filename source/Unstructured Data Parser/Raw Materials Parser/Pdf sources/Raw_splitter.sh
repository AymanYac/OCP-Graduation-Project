cd $1
for full in ./*.pdf
do
pdfseparate -f 2 -l 2 $full ../../Targ/$full
done