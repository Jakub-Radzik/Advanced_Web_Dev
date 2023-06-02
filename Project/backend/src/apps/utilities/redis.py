from datetime import datetime, date
import json
from src.settings import settings
from functools import wraps
from pydantic import BaseModel


def redis_cache(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        redis = settings.REDIS_INSTANCE

        data = await redis.get(f"{func.__name__} {args} {kwargs}")
        last_checked = await redis.get(f"{func.__name__} {args} {kwargs} last_checked")
        now = datetime.now()

        if (
            data is not None
            and last_checked is not None
            and (now - datetime.fromisoformat(last_checked)).seconds < 60 * 60
        ):
            return json.loads(data)
        else:
            result = await func(*args, **kwargs)
            result = recursive_to_string(result)
            await redis.set(f"{func.__name__} {args} {kwargs}", json.dumps(result))
            await redis.set(f"{func.__name__} {args} {kwargs} last_checked", now.isoformat())
            return result

    return wrapper


def recursive_to_string(obj):
    if isinstance(obj, dict):
        return {k: recursive_to_string(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [recursive_to_string(i) for i in obj]
    elif isinstance(obj, tuple):
        return tuple(recursive_to_string(i) for i in obj)
    elif isinstance(obj, set):
        return {recursive_to_string(i) for i in obj}
    elif isinstance(obj, frozenset):
        return frozenset(recursive_to_string(i) for i in obj)
    elif isinstance(obj, bytes):
        return obj.decode("utf-8")
    elif isinstance(obj, BaseModel):
        return recursive_to_string(obj.dict())
    elif isinstance(obj, date):
        return obj.isoformat()
    else:
        return obj
