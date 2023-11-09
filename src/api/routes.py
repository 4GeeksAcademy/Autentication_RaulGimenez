"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/users", methods=["POST", "GET"])
def users():
    if request.method == "POST":
        user_request = request.get_json(force=True)
        user = User(
            password = user_request.get("password"),
            email = user_request.get("email"),
            is_active = True
        )
        db.session.add(user)
        db.session.commit()
        return jsonify("Create user successfuly"), 200

    users = db.session.execute(db.select(User)).scalars()
    users_list = [user.serialize() for user in users]
    return jsonify(users_list), 200

@api.route("/login", methods=["POST"])
def login():
    user_request = request.get_json(force=True)
    email = user_request["email"]
    password = user_request["password"]

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({"error": "Credenciales inválidas"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        "token": access_token,
        "email": user.email,
        "user_id": user.id,
    })