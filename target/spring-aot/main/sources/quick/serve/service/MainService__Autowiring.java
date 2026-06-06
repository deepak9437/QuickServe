package quick.serve.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link MainService}.
 */
@Generated
public class MainService__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static MainService apply(RegisteredBean registeredBean, MainService instance) {
    AutowiredFieldValueResolver.forRequiredField("userRepo").resolveAndSet(registeredBean, instance);
    AutowiredFieldValueResolver.forRequiredField("providerRepo").resolveAndSet(registeredBean, instance);
    AutowiredFieldValueResolver.forRequiredField("providerDocRepository").resolveAndSet(registeredBean, instance);
    AutowiredFieldValueResolver.forRequiredField("emailService").resolveAndSet(registeredBean, instance);
    instance.userImage = AutowiredFieldValueResolver.forRequiredField("userImage").resolve(registeredBean);
    instance.pDocument = AutowiredFieldValueResolver.forRequiredField("pDocument").resolve(registeredBean);
    instance.pCertificate = AutowiredFieldValueResolver.forRequiredField("pCertificate").resolve(registeredBean);
    instance.pExtraCertificate = AutowiredFieldValueResolver.forRequiredField("pExtraCertificate").resolve(registeredBean);
    return instance;
  }
}
