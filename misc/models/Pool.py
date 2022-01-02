from mongoengine import Document, StringField, DateTimeField, DecimalField
from datetime import datetime


class Pool(Document):
    meta = {'collection': 'Pools'}
    name = StringField(required=True)
    token0 = StringField(required=True)
    token1 = StringField(required=True)
    exchange = StringField(required=True)
    createdAt = DateTimeField(required=True, default=datetime.now)
    updatedAt = DateTimeField(required=True, default=datetime.now)