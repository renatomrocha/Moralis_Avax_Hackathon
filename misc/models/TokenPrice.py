from mongoengine import Document, StringField, DateTimeField, DecimalField
from datetime import datetime


class TokenPrice(Document):
    meta = {'collection': 'TokenPrices'}
    address = StringField(required=True)
    date = DateTimeField(required=True)
    exchange = StringField(required=True)
    price = DecimalField(required=True)
    createdAt = DateTimeField(required=True, default=datetime.now)
    updatedAt = DateTimeField(required=True, default=datetime.now)
