package quick.serve.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import quick.serve.entity.BookingEntity;

public interface BookingRepo extends JpaRepository<BookingEntity, Integer>{
	
}
