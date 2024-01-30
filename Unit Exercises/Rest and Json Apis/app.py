"""Flask app for Cupcakes"""
import os
from flask import Flask, request, jsonify, abort, render_template
from models import db, Cupcake
from pprint import pprint as pp

# Configurations for environment.
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = '🤫'


with app.app_context():
    db.app = app
    db.init_app(app)


#Utilities
def serialize_cupcake(db_object):
    return  {
           'id':db_object.id,
           'flavor': db_object.flavor,
           'size': db_object.size,
           'rating': db_object.rating,
           'image': db_object.image
    }


@app.route('/', methods=['GET'])
def get_root():
    return render_template('root.html')


@app.route('/', methods=['POST'])
def post_handle_form():

    if request.files:
        if request.files['image']:
            image = request.files['image']
            filename = image.filename
            image_path = os.path.join('static', filename)
            image.save(image_path)


    return "File uploaded successfully"


@app.route('/api/cupcakes', methods=['GET'])
def get_all_cupcakes():
    cupcakes = db.session.query(Cupcake).all()

    result = []
    for cupcake in cupcakes:
        result.append(serialize_cupcake(cupcake))
    return jsonify({'cupcakes':result})


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['GET'])
def get_cupcake(cupcake_id):
    cupcake = db.session.query(Cupcake).filter_by(id=cupcake_id).first()
    result = serialize_cupcake(cupcake)
    return jsonify({'cupcake':result})


@app.route('/api/cupcakes', methods=['POST'])
def post_cupcake():
    '''
    Create dessert from form data & return it.
    '''
    new_flavor = request.json['flavor']
    new_size = request.json['size']
    new_rating = request.json['rating']
    new_image = request.json['image']

    new_cupcake = Cupcake(flavor=new_flavor,
                          size=new_size,
                          rating=new_rating,
                          image=new_image)

    db.session.add(new_cupcake)
    db.session.commit()

    result = serialize_cupcake(new_cupcake)

    return (jsonify({'cupcake':result}), 201)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    cupcake = db.session.query(Cupcake).filter_by(id=cupcake_id).first()

    if not cupcake:
        return abort(404)

    new_flavor = request.json['flavor']
    new_size = request.json['size']
    new_rating = request.json['rating']
    new_image = request.json['image']

    cupcake.flavor = new_flavor
    cupcake.size = new_size
    cupcake.rating = new_rating
    cupcake.image = new_image

    db.session.commit()

    result = serialize_cupcake(cupcake)

    return (jsonify({'cupcake':result}))


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = db.session.query(Cupcake).filter_by(id=cupcake_id).first()

    if not cupcake:
        return abort(404)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify({'message': 'Deleted'})


