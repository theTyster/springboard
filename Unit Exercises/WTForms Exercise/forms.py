from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import (
    StringField,
    FloatField,
    TextAreaField,
    SelectField
)
from wtforms.validators import (
    InputRequired,
    Optional,
    NumberRange
)

class PetForm(FlaskForm):
    '''
    Form for adding pets.
    '''
    name = StringField('Name',
                       validators=[InputRequired()])

    species = SelectField('Species',
                          validators=[InputRequired()],
                          choices=[('cat', 'Cat'),
                                    ('dog', 'Dog'),
                                    ('porcupine', 'Porcupine')])

    image = FileField('Upload Photo',
                          validators=[FileAllowed(['jpg',
                                                   'jpeg',
                                                   'png'])])

    age = FloatField('Age',
                     validators=[Optional(),
                                 NumberRange(min=1, max=30)])

    notes = TextAreaField('Additional Notes',
                          validators=[Optional()])
