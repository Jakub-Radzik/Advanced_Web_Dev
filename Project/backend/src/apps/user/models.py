from tortoise import fields
from tortoise.models import Model
from src.apps.sessions.models import Ticket


class BlacklistTokens(Model):
    """
    Class that represents all tokens that have been blacklisted in the process of logout.
    """

    token = fields.CharField(max_length=250, unique=True)
    email = fields.CharField(max_length=100)


class ReservationToken(Model):
    """
    Class that represents all tokens that have been used to make a ticket reservation.
    """
    token = fields.CharField(max_length=250, unique=True)
    email = fields.CharField(max_length=100)
    ticket = fields.JSONField()     # List of ticket ids
