package quick.serve.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link MainService}.
 */
@Generated
public class MainService__BeanDefinitions {
  /**
   * Get the bean definition for 'mainService'.
   */
  public static BeanDefinition getMainServiceBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(MainService.class);
    InstanceSupplier<MainService> instanceSupplier = InstanceSupplier.using(MainService::new);
    instanceSupplier = instanceSupplier.andThen(MainService__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
