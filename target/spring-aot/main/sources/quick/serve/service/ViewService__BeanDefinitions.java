package quick.serve.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link ViewService}.
 */
@Generated
public class ViewService__BeanDefinitions {
  /**
   * Get the bean definition for 'viewService'.
   */
  public static BeanDefinition getViewServiceBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(ViewService.class);
    InstanceSupplier<ViewService> instanceSupplier = InstanceSupplier.using(ViewService::new);
    instanceSupplier = instanceSupplier.andThen(ViewService__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
