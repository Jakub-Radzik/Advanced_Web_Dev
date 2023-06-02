from tortoise import fields
from tortoise.models import Model


class BlacklistTokens(Model):
    """
    Class that represents all tokens that have been blacklisted in the process of logout.
    """

    token = fields.CharField(max_length=250, unique=True)
    email = fields.CharField(max_length=100)
