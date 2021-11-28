import json

filepath = './common/models/cup.txt'
obj = {
    "vertices": [],
    "normals": [],
    "texcoords": [],
    "indices": []
}
with open(filepath) as fp:
   line = fp.readline()
   while line:
        tag = line[:2]
        if(tag == "v "): 
           val = line[2:].split(" ")
           obj['vertices'].append(float(val[0]))
           obj['vertices'].append(float(val[1]))
           obj['vertices'].append(float(val[2]))
        if(tag == "vt"): 
           val = line[3:].split(" ")
           obj['texcoords'].append(float(val[0]))
           obj['texcoords'].append(float(val[1]))
        if(tag == "vn"): 
           val = line[3:].split(" ")
           obj['normals'].append(float(val[0]))
           obj['normals'].append(float(val[1]))
           obj['normals'].append(float(val[2]))
        if(tag == "f "): 
           val = line[2:].split(" ")
           for i in range(3):
               values = val[i].split("/")
               obj['indices'].append(int(values[0])-1)
        line = fp.readline()

with open("./common/models/cup.json", "w") as fp:
    json.dump(obj, fp)

       