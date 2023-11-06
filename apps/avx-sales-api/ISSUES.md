# List of severe issues

- Planetscale sync with typeorm: https://github.com/planetscale/discussion/discussions/483

## Todo

- Validation
  - Investiage how to do validation return in the best way (meaning what to return to the frontend)
- Add constraint decorators on models in typeorm entities
- Try catch for DB operations and introspect errors
  - more specifically for MySQL
- BIG TASK: come up with abstract interface for accessing database -> Repository
- Start modeling database -> objects and connections

### Tech Debt

- Looks like @Check(`"probability" >= 0 AND "probability" <= 100`) does not work in typeorm decoration for planetscale (?) -> research

```
Maybe take a look into Result Pattern
-> it's in packages/common/types.ts -> Result

abstract class AvxRepository {
  async getOne():Result<GetOneSuccess, GetOneSuccessError> {
    try {

    } catch (error) {
      // introspect MYSQL
    }
  }
  async getMany() {}
}

class UserRepository implements AvxRepository {
  getMany(): Promise<void> {}
  getOne(): Promise<void> {}
}



```
