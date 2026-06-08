package quick.serve.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import quick.serve.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	@Query("SELECT u FROM UserEntity u WHERE u.userEmail = :userEmail AND u.password = :password")
	//UserEntity findByUserEmailAndPassword(String userEmail, String password);
 
	UserEntity findByUserEmail(String userEmail);

//	UserEntity findByUserUserEmailAndUserPasswordAndStatus(String userEmail, String password ,String status);

}
