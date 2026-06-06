package quick.serve.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link ViewDetailsController}.
 */
@Generated
public class ViewDetailsController__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static ViewDetailsController apply(RegisteredBean registeredBean,
      ViewDetailsController instance) {
    AutowiredFieldValueResolver.forRequiredField("viewService").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
