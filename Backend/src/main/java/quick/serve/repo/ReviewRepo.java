package quick.serve.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import quick.serve.entity.ReviewEntity;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewEntity,Integer>{

    boolean existsByBId(Integer bId);

    List<ReviewEntity> findByPId(Integer pId);
}
