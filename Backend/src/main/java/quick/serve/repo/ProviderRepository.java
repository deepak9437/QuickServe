package quick.serve.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderEntity, Integer> {

	void save(ProviderDocEntity pdEntity);

	ProviderEntity findByProviderEmailAndPassword(String providerEmail, String password);

	@Query("""
			SELECT DISTINCT p
			FROM Provider p
			LEFT JOIN FETCH p.providerDocuments
			JOIN FETCH p.user
			""")
	List<ProviderEntity> findAllWithDetails();
}
