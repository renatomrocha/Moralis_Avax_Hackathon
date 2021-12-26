from datetime import datetime

from mongoengine import Document, StringField, DateTimeField


class Token(Document):
    meta = {'collection': 'TokenDetails'}
    name = StringField(required=True)
    symbol = StringField(required=True)
    address = StringField(required=True)
    createdAt = DateTimeField(required=True, default=datetime.now)
    updatedAt = DateTimeField(required=True, default=datetime.now)
