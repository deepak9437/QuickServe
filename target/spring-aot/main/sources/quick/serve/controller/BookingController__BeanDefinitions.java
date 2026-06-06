package quick.serve.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.BeanInstanceSupplier;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;
import quick.serve.service.BookingService;

/**
 * Bean definitions for {@link BookingController}.
 */
@Generated
public class BookingController__BeanDefinitions {
  /**
   * Get the bean instance supplier for 'bookingController'.
   */
  private static BeanInstanceSupplier<BookingController> getBookingControllerInstanceSupplier() {
    return BeanInstanceSupplier.<BookingController>forConstructor(BookingService.class)
            .withGenerator((registeredBean, args) -> new BookingController(args.get(0)));
  }

  /**
   * Get the bean definition for 'bookingController'.
   */
  public static BeanDefinition getBookingControllerBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(BookingController.class);
    beanDefinition.setInstanceSupplier(getBookingControllerInstanceSupplier());
    return beanDefinition;
  }
}
