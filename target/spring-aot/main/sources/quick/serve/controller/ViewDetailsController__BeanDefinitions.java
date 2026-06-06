package quick.serve.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link ViewDetailsController}.
 */
@Generated
public class ViewDetailsController__BeanDefinitions {
  /**
   * Get the bean definition for 'viewDetailsController'.
   */
  public static BeanDefinition getViewDetailsControllerBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(ViewDetailsController.class);
    InstanceSupplier<ViewDetailsController> instanceSupplier = InstanceSupplier.using(ViewDetailsController::new);
    instanceSupplier = instanceSupplier.andThen(ViewDetailsController__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
