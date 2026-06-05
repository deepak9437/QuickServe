package quick.serve.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import quick.serve.entity.ProviderEntity;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderEntity, Integer> {

//	UserEntity findByEmailAndPassword(String email, String password);

	@Query("""
			    SELECT DISTINCT p
			    FROM ProviderEntity p
			    JOIN FETCH p.user
			    LEFT JOIN FETCH p.pDocs
			""")
	List<ProviderEntity> findAllWithDetails(); // jpql

	String findByStatus(String status);

//	@Query(value = "", nativeQuery = true);

	@Query(value = "select status from provider where user_id =:id", nativeQuery = true)
	String findByUId(@Param("id") Integer id);

//	ProviderEntity findByUserUserEmailAndUserPassword(String userEmail, String password);
}
