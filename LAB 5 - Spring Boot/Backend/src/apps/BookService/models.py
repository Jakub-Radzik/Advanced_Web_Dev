from tortoise import fields
from tortoise.models import Model

from src.apps.Author.models import Author


class Book(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    author = fields.ForeignKeyField('models.Author', related_name='books')
    pages = fields.IntField()
    is_borrowed = fields.BooleanField(default=False)

    def __str__(self):
        return self.title
