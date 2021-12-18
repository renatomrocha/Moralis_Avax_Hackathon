from datetime import datetime

from mongoengine import Document, StringField, DateTimeField


class Dex(Document):
    meta = {'collection': 'Dex'}
    name = StringField(required=True)
    address = StringField(required=True)
    erc20address = StringField(required=True)
    createdAt = DateTimeField(required=True, default=datetime.now)
    updatedAt = DateTimeField(required=True, default=datetime.now)


def find_dex_by_id(_id):
    try:
        dex_object = Dex.objects(id=_id).get()
        return dex_object
    except Exception as e:
        print('Unable to find dex: ', e)


def create_new_dex(*, name, address, erc20address):
    try:
        new_dex = Dex(name=name, address=address, erc20address=erc20address)
        new_dex.save()
        print('Dex {} successfully created!'.format(name))
    except Exception as e:
        print("Error creating a new dex: {}".format(e))
