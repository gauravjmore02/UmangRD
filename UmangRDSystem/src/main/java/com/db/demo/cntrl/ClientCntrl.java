package com.db.demo.cntrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.demo.entity.Client;
import com.db.demo.repo.ClientRepo;
import com.db.demo.service.ClientService;

@RestController
@RequestMapping("/clients")
public class ClientCntrl {
	
	@Autowired
	private ClientRepo crepo;
	
	 @Autowired
	 private ClientService clientService;
	 
	 @GetMapping("/inactive")
	 public ResponseEntity<List<Client>> getInactiveClients() {
	     return ResponseEntity.ok(clientService.getInactiveClients());
	 }
	 
	 @GetMapping("/all")
	 public List<Client> getAllActiveClients() {
	     return crepo.findActiveClients();
	 }
	
	
	@PostMapping("/save")
	public Client saveClient(@RequestBody Client c) {
		return crepo.save(c);
	}
	
	

	  @PutMapping("/update/{cid}")
	  public ResponseEntity<Client> updateClient(
	            @PathVariable ("cid")int cid,
	            @RequestBody Client client) {

	        Client updatedClient = clientService.updateClient(cid, client);
	        return ResponseEntity.ok(updatedClient);
	    }
	  
	  @PutMapping("/delete/{cid}")
	  public ResponseEntity<String> softDeleteClient(@PathVariable("cid") int cid) {
	      clientService.softDeleteClient(cid);
	      return ResponseEntity.ok("Client deleted successfully ");
	  }
	  
	  @PutMapping("/revoke/{cid}")
	  public ResponseEntity<String> revokeClient(@PathVariable("cid") int cid) {
	      clientService.revokeClient(cid);
	      return ResponseEntity.ok("Client revoke successfully ");
	  }
	  
	  @GetMapping("/client/{cid}")
	  public Client getClientById(@PathVariable("cid") int cid) {
	      return crepo.findById(cid).orElseThrow(() -> new RuntimeException("Client not found"));
	  }
	  
	  @GetMapping("/count")
	  public int getCount() {
		return crepo.findCount();
		  
	  }
}
