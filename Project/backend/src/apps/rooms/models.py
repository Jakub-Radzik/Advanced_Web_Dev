from tortoise import fields
from tortoise.models import Model


class Room(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)
    rows = fields.IntField()
    seats_per_row = fields.IntField()
    is_IMAX = fields.BooleanField(default=True)
    alignment = fields.CharField(max_length=255)
    screen_size = fields.IntField()
    matrix = fields.JSONField()

    def __str__(self):
        return self.name
