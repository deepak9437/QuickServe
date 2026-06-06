package quick.serve.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link ViewService}.
 */
@Generated
public class ViewService__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static ViewService apply(RegisteredBean registeredBean, ViewService instance) {
    AutowiredFieldValueResolver.forRequiredField("providerRepo").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
