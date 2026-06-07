
package quick.serve.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import quick.serve.entity.ProviderDocEntity;

public interface ProviderDocRepository extends JpaRepository<ProviderDocEntity, Integer> {

}