#! /usr/bin/env python3
"""Pet Adoption Website"""

import os
from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import sql, Pets
from forms import PetForm

# SETUP
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = '🤫'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

with app.app_context():
    sql.start_db(app)

# ROUTES
@app.route('/')
def get_pets():
    pets = sql.get_table(Pets)
    return render_template(
        'pets.html',
        title='Available Pets',
        pets=pets
    )


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    ''''
    Renders form for adding pets.
    '''
    form = PetForm()

    if form.validate_on_submit():
        pet_name = form.name.data
        pet_species = form.species.data
        pet_image_file = form.image.data
        pet_age = form.age.data
        pet_notes = form.notes.data

        if pet_image_file:
            # Saves image file to static directory.
            pet_image_file_location = os.path.join(
                app.root_path,
                'static',
                pet_image_file.filename)

            pet_image_file.save(pet_image_file_location)

        new_pet = Pets(name=pet_name,
                       species=pet_species,
                       image=pet_image_file,
                       age=pet_age,
                       notes=pet_notes)

        sql.insert(new_pet)
        sql.commit()

        flash('processing...')
        return redirect('/add')

    else:
        return render_template(
            'add_pet_form.html',
            form=form,
            title='🐶 Up For Adoption'
        )

@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def edit_pet(pet_id):
    pet = sql.get_rows(Pets, Pets.id, pet_id).first()[0]
    form = PetForm(obj=pet)

    if form.validate_on_submit():
        pet_name = form.name.data
        pet_species = form.species.data
        pet_image_file = form.image.data
        pet_age = form.age.data
        pet_notes = form.notes.data

        if pet_image_file:
            # Saves image file to static directory.
            pet_image_file_location = os.path.join(
                app.root_path,
                'static',
                pet_image_file.filename)

            pet_image_file.save(pet_image_file_location)

        pet.name=pet_name
        pet.species=pet_species
        pet.image=pet_image_file
        pet.age=pet_age
        pet.notes=pet_notes

        sql.commit()
        flash('processing...')
        return redirect('/')

    return render_template(
        'edit_pet_form.html',
        form=form,
        pet=pet,
        title='🐱 Edit Pet Info'
    )
