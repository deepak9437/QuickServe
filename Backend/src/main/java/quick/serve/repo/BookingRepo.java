package quick.serve.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import quick.serve.entity.BookingEntity;

@Repository
public interface BookingRepo extends JpaRepository<BookingEntity, Integer> {

    long countByPId(Integer pId);

    long countByPIdAndBookingStatus(Integer pId, String bookingStatus);

    List<BookingEntity> findByPIdOrderByBookingDateDesc(Integer pId);
    
  

}