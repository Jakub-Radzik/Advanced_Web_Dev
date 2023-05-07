from tortoise import fields
from tortoise.models import Model


class Movie(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    poster_path = fields.TextField()
    backdrop_path = fields.TextField()
    overview = fields.TextField()
    release_date = fields.DateField()
    vote_average = fields.FloatField()
    vote_count = fields.IntField()
    original_language = fields.CharField(max_length=255)
    original_title = fields.CharField(max_length=255)
    genres = fields.JSONField()
    runtime = fields.IntField()
