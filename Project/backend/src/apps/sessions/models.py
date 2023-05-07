from tortoise import fields
from tortoise.models import Model


class Session(Model):
    id = fields.IntField(pk=True)
    room_fk = fields.ForeignKeyField('models.Room', related_name='sessions')
    movie_fk = fields.ForeignKeyField('models.Movie', related_name='sessions')
    datetime = fields.DatetimeField()


class Ticket(Model):
    id = fields.IntField(pk=True)
    session_fk = fields.ForeignKeyField('models.Session', related_name='tickets')
    seat = fields.IntField()
    row = fields.IntField()
    price = fields.DecimalField(max_digits=5, decimal_places=2)
    is_sold = fields.BooleanField(default=False)
    is_vip = fields.BooleanField(default=False)
    is_imax = fields.BooleanField(default=False)
    is_reserved = fields.BooleanField(default=False)
