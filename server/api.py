from flask import Flask, request
from flask_cors import CORS, cross_origin
import mysql.connector
import json
import collections

app = Flask(__name__)
dbConn = mysql.connector.connect(host='localhost', user='root', password='', database='soccershop')
cursor = dbConn.cursor()
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def home():
    return {"message": "Wellcome to Python API from Soccershop"}

@app.route("/products", methods=['GET'])
def products():
    sql = ("SELECT id_product, name_product, price FROM products")
    cursor.execute(sql)
    rows = cursor.fetchall()
    
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['id'] = row[0]
        d['name'] = row[1]
        d['price'] = float(row[2])
        objects_list.append(d)

    j = json.dumps(objects_list)
    return(j)
    
    cursor.close()
    dbConn.close()


@app.route("/calculate", methods = ['GET', 'POST'])
def calculate():
    if(request.method == 'GET'):
        return {"message": "Wellcome to calculate route"}
    else:
        data = request.get_json()
        price = (int(data["price"]) - ((int(data["price"]) * int(data["discount"])) / 100))
        response.end({"price": price})

        

@app.errorhandler(404)
def not_found(error):
    return {"error": "Page not found"}

app.run(port=5000, debug=True)
