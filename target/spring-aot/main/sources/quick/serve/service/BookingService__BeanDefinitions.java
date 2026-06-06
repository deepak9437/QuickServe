package quick.serve.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link BookingService}.
 */
@Generated
public class BookingService__BeanDefinitions {
  /**
   * Get the bean definition for 'bookingService'.
   */
  public static BeanDefinition getBookingServiceBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(BookingService.class);
    InstanceSupplier<BookingService> instanceSupplier = InstanceSupplier.using(BookingService::new);
    instanceSupplier = instanceSupplier.andThen(BookingService__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
