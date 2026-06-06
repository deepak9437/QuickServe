package quick.serve;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link QuickServeApplication}.
 */
@Generated
public class QuickServeApplication__BeanDefinitions {
  /**
   * Get the bean definition for 'quickServeApplication'.
   */
  public static BeanDefinition getQuickServeApplicationBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(QuickServeApplication.class);
    beanDefinition.setInstanceSupplier(QuickServeApplication::new);
    return beanDefinition;
  }
}
