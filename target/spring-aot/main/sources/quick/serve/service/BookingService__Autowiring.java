package quick.serve.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link BookingService}.
 */
@Generated
public class BookingService__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static BookingService apply(RegisteredBean registeredBean, BookingService instance) {
    AutowiredFieldValueResolver.forRequiredField("bookingRepo").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
