package quick.serve.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link MainController}.
 */
@Generated
public class MainController__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static MainController apply(RegisteredBean registeredBean, MainController instance) {
    AutowiredFieldValueResolver.forRequiredField("mainService").resolveAndSet(registeredBean, instance);
    AutowiredFieldValueResolver.forRequiredField("userRepo").resolveAndSet(registeredBean, instance);
    AutowiredFieldValueResolver.forRequiredField("providerRepo").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
