export function handleHTTPError(
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> | void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (error) {
      console.error(`Error in ${propertyKey.toString()}:`, error);

      throw error;
    }
  };

  return descriptor;
}
