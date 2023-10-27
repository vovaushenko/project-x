# List of severe issues

- Planetscale sync with typeorm: https://github.com/planetscale/discussion/discussions/483

## Todo

- Validation
- Add constraint decorators on models in typeorm entities
- Start modeling database -> objects and connections
- Try catch for DB operations and introspect errors

### Tech Debt

- Looks like @Check(`"probability" >= 0 AND "probability" <= 100`) does not work in typeorm decoration for planetscale (?) -> research
