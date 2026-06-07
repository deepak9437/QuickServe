package quick.serve.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import quick.serve.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	UserEntity findByUserEmailAndPassword(String userEmail, String password);

//	UserEntity findByUserUserEmailAndUserPasswordAndStatus(String userEmail, String password ,String status);

}
