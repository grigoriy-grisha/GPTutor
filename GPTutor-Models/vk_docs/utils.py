def unique_objects_by_field(objects, field):
    seen = set()
    unique_objects = []
    for obj in objects:
        value = obj[field]
        if value not in seen:
            unique_objects.append(obj)
            seen.add(value)
    return unique_objects
