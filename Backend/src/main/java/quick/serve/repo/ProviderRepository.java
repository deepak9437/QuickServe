package quick.serve.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderEntity, Integer> {

	void save(ProviderDocEntity pdEntity);

//	UserEntity findByEmailAndPassword(String email, String password);

	
	// jpql
	@Query("""
		    SELECT DISTINCT p
		    FROM ProviderEntity p
		    JOIN FETCH p.user
		    LEFT JOIN FETCH p.pDocs
		    WHERE p.status = :status
		""")
		List<ProviderEntity> findAllDetails(@Param("status") String status);

	String findByStatus(String status);

//	@Query(value = "", nativeQuery = true);

	@Query(value = "select status from provider where user_id =:id", nativeQuery = true)
	String findByUserId(@Param("id") Integer id);

	
	@Query("""
		    SELECT p
		    FROM ProviderEntity p
		    JOIN FETCH p.user
		    WHERE LOWER(p.skills) = LOWER(:skills)
		""")
		List<ProviderEntity> findBySkills(@Param("skills") String skills);

	long countByStatus(String string);

}
