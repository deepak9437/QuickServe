package quick.serve.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link MainController}.
 */
@Generated
public class MainController__BeanDefinitions {
  /**
   * Get the bean definition for 'mainController'.
   */
  public static BeanDefinition getMainControllerBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(MainController.class);
    InstanceSupplier<MainController> instanceSupplier = InstanceSupplier.using(MainController::new);
    instanceSupplier = instanceSupplier.andThen(MainController__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
