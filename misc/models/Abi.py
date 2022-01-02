from mongoengine import Document, StringField, DateTimeField, DecimalField
from datetime import datetime


class Abi(Document):
    meta = {'collection': 'ABIs'}
    tokenAddress = StringField(required=True)
    abi = StringField(required=False)
    createdAt = DateTimeField(required=True, default=datetime.now)
    updatedAt = DateTimeField(required=True, default=datetime.now)