package quick.serve.repo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.lang.String;
import org.springframework.aot.generate.Generated;
import org.springframework.data.jpa.repository.aot.AotRepositoryFragmentSupport;
import org.springframework.data.jpa.repository.query.QueryEnhancerSelector;
import org.springframework.data.repository.core.support.RepositoryFactoryBeanSupport;
import quick.serve.entity.UserEntity;

/**
 * AOT generated JPA repository implementation for {@link UserRepository}.
 */
@Generated
public class UserRepositoryImpl__AotRepository extends AotRepositoryFragmentSupport {
  private final RepositoryFactoryBeanSupport.FragmentCreationContext context;

  private final EntityManager entityManager;

  public UserRepositoryImpl__AotRepository(EntityManager entityManager,
      RepositoryFactoryBeanSupport.FragmentCreationContext context) {
    super(QueryEnhancerSelector.DEFAULT_SELECTOR, context);
    this.entityManager = entityManager;
    this.context = context;
  }

  /**
   * AOT generated implementation of {@link UserRepository#findByUserEmailAndPassword(java.lang.String,java.lang.String)}.
   */
  public UserEntity findByUserEmailAndPassword(String userEmail, String password) {
    String queryString = "SELECT u FROM UserEntity u WHERE u.userEmail = :userEmail AND u.password = :password";
    Query query = this.entityManager.createQuery(queryString);
    query.setParameter("userEmail", userEmail);
    query.setParameter("password", password);

    return (UserEntity) convertOne(query.getSingleResultOrNull(), false, UserEntity.class);
  }
}
