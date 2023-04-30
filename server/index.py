from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json

app = Flask(__name__)
CORS(app)

load_dotenv()

username = os.environ['USERNAME']
password = os.environ['PASSWORD']
hostname = os.environ['HOSTNAME']

client = MongoClient('mongodb+srv://'+username+':'+password+'@'+hostname+'/?retryWrites=true&w=majority')
db = client.aicteDB
students = db.students
purchase = db.purchase

@app.route('/')
def hello():
    return 'Hello World'

@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.get_json()
    print(data)
    student = students.find_one({"name": data['username']})
    if(student):
        if data['password'] == student['password']:
            del student['password']
            student_dict = {k: v for k, v in student.items() if k != '_id'}
            student_dict['status'] = 'success'
            return jsonify(student_dict)
        else:
            response = jsonify({'status': 'failure', 'message': 'Incorrect Password'})
            print(response.get_data())
            return response
    else:
        response = jsonify({'status': 'failure', 'message': 'No Student Found'})
        return response
    

@app.route('/delete_order', methods=['PUT'])
def delete_order():
    data = request.get_json()
    userId = data['id']
    user = purchase.find_one({"id": userId})
    if(user):
        result = purchase.update_one({"id": userId}, {"$pull": {"products": {"id": data['productId']}}})
        return 'Order deleted'
    else:
        return 'Error occured'


@app.route('/add_order', methods=['PUT'])
def add_order():
    data = request.get_json()
    userID = data['id']
    user = purchase.find_one({"id": userID})
    if(user):
        productID = data['productId']
        productName = data['productName']
        price = data['price']
        rating = data['rating']
        order = {
            "id": productID,
            "productName": productName,
            "price": price,
            "rating": rating
        }
        result = purchase.update_one({"id": data['id']}, {"$push": {"products": order}})
        return 'Order added'
    else:
        return 'Error occured'


@app.route('/add_session', methods=['POST'])
def add_session():
    data = request.get_json()
    print(data)
    student = students.find_one({"name": data['username']})
    session = data['session']
    if(student):
        if data['password'] == student['password']:
            students.update_one({"name": data['username']}, {"$push": {"sessions": session}})
            student = students.find_one({"name": data['username']})
            del student['password']
            student_dict = {k: v for k, v in student.items() if k != '_id'}
            student_dict['status'] = 'success'
            return jsonify(student_dict)
        else:
            response = jsonify({'status': 'failure', 'message': 'Incorrect Password'})
            return response
    else:
        response = jsonify({'status': 'failure', 'message': 'No Student Found'})
        return response
    
@app.route('/delete_session', methods=['POST'])
def delete_session():
    data = request.get_json()
    print(data)
    student = students.find_one({"name": data['username']})
    session = data['session']
    if(student):
        if data['password'] == student['password']:
            if session in student['sessions']:
                students.update_one({"name": data['username']}, {"$pull": {"sessions": session}})
                student = students.find_one({"name": data['username']})
                del student['password']
                student_dict = {k: v for k, v in student.items() if k != '_id'}
                return jsonify(student_dict)
            else:
                return 'Session not found'
        else:
            return 'Incorrect Password'
    else:
        return 'No Student Found'

app.run(port=5002)
