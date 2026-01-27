package com.db.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.db.demo.entity.Client;


public interface ClientRepo extends JpaRepository<Client,Integer>{
		@Query(
			  value = "SELECT * FROM client WHERE active = true",
			  nativeQuery = true
			)
			List<Client> findActiveClients(); 
		@Query(
				  value = "SELECT * FROM client WHERE active = false",
				  nativeQuery = true
				)
				List<Client> findInactiveClients();
		@Query(
				value="SELECT COUNT(*) FROM client WHERE active = true;",
				nativeQuery =true
				)
				 int findCount();

}
