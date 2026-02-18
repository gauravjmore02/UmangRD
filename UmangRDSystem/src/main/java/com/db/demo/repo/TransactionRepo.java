package com.db.demo.repo;

import java.util.List;
   
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.db.demo.dto.TransactionDto;
import com.db.demo.entity.Transactions;

public interface TransactionRepo extends JpaRepository<Transactions,Integer>{
			
	Transactions findTopByCidOrderByTidDesc(int cid);


			@Query(
		        value = "SELECT * FROM transactions WHERE cid = :cid",
		        nativeQuery = true
		    )
		    List<Transactions> findByCid(@Param("cid") int cid);

		    @Query(
		        value = "SELECT * FROM transactions WHERE cid = :cid AND flag = true",
		        nativeQuery = true
		    )
		    List<Transactions> findByCidAndFlagTrue(@Param("cid") int cid);
		    
		    @Query(
		    	      value = "SELECT c.rdamount,c.active,t.tid,t.cid, t.duedate,t.installment_pay ,t.late_days,t.fine_amount, t.total_amount ,t.flag FROM client c JOIN transactions t ON c.cid = t.cid WHERE c.cid = :cid", 
		    	      nativeQuery = true
		    	    )
		    	    List<TransactionDto> findClientTransactions(@Param("cid") int cid);
	
}
