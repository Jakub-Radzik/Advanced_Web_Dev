from datetime import datetime, timedelta
from tortoise import fields
from tortoise.models import Model
from src.apps.movies.models import Movie
from src.apps.rooms.models import Room


class Session(Model):
    id = fields.IntField(pk=True)
    room_fk = fields.ForeignKeyField('models.Room', related_name='sessions')
    movie_fk = fields.ForeignKeyField('models.Movie', related_name='sessions')
    datetime = fields.DatetimeField()

    class Meta:
        unique_together = ('room_fk', 'datetime')


class Ticket(Model):
    id = fields.IntField(pk=True)
    session_fk = fields.ForeignKeyField('models.Session', related_name='tickets')
    seat = fields.IntField()
    row = fields.IntField()
    price = fields.DecimalField(max_digits=5, decimal_places=2)
    is_sold = fields.BooleanField(default=False)
    is_vip = fields.BooleanField(default=False)
    is_imax = fields.BooleanField(default=False)
    last_reserved = fields.DatetimeField(null=True)

    def is_reserved(self):
        return self.last_reserved is not None and self.last_reserved > datetime.now() - timedelta(minutes=2)

    class Meta:
        unique_together = ('session_fk', 'seat', 'row')

    class PydanticMeta:
        computed = ('is_reserved',)
