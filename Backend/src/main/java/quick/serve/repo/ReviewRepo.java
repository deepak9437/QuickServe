package quick.serve.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import quick.serve.entity.ReviewEntity;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewEntity,Integer>{

    boolean existsByBId(Integer bId);

    List<ReviewEntity> findByPId(Integer pId);

    @Query("SELECT COUNT(r) FROM ReviewEntity r WHERE r.uId = :uId")
    long countUId(@Param("uId") Integer uId);
}
