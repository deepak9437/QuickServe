package quick.serve.repo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.lang.Integer;
import java.lang.String;
import java.util.List;
import org.springframework.aot.generate.Generated;
import org.springframework.data.jpa.repository.aot.AotRepositoryFragmentSupport;
import org.springframework.data.jpa.repository.query.QueryEnhancerSelector;
import org.springframework.data.repository.core.support.RepositoryFactoryBeanSupport;
import org.springframework.data.repository.query.Param;
import quick.serve.entity.ProviderEntity;

/**
 * AOT generated JPA repository implementation for {@link ProviderRepository}.
 */
@Generated
public class ProviderRepositoryImpl__AotRepository extends AotRepositoryFragmentSupport {
  private final RepositoryFactoryBeanSupport.FragmentCreationContext context;

  private final EntityManager entityManager;

  public ProviderRepositoryImpl__AotRepository(EntityManager entityManager,
      RepositoryFactoryBeanSupport.FragmentCreationContext context) {
    super(QueryEnhancerSelector.DEFAULT_SELECTOR, context);
    this.entityManager = entityManager;
    this.context = context;
  }

  /**
   * AOT generated implementation of {@link ProviderRepository#findAllWithDetails()}.
   */
  public List<ProviderEntity> findAllWithDetails() {
    String queryString = "    SELECT DISTINCT p\n"
            + "    FROM ProviderEntity p\n"
            + "    JOIN FETCH p.user\n"
            + "    LEFT JOIN FETCH p.pDocs\n";
    Query query = this.entityManager.createQuery(queryString);

    return (List<ProviderEntity>) query.getResultList();
  }

  /**
   * AOT generated implementation of {@link ProviderRepository#findByStatus(java.lang.String)}.
   */
  public String findByStatus(String status) {
    String queryString = "SELECT p FROM ProviderEntity p WHERE p.status = :status";
    Query query = this.entityManager.createQuery(queryString);
    query.setParameter("status", status);

    return (String) convertOne(query.getSingleResultOrNull(), false, String.class);
  }

  /**
   * AOT generated implementation of {@link ProviderRepository#findByUserId(java.lang.Integer)}.
   */
  public String findByUserId(@Param("id") Integer id) {
    String queryString = "select status from provider where user_id =:id";
    Query query = this.entityManager.createNativeQuery(queryString);
    query.setParameter("id", id);

    return (String) convertOne(query.getSingleResultOrNull(), true, String.class);
  }
}
