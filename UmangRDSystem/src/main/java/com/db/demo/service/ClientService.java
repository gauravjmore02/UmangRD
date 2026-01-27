package com.db.demo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.demo.entity.Client;
import com.db.demo.repo.ClientRepo;
@Service
public class ClientService {
	
	 @Autowired
	    private ClientRepo clientRepo;

	    public Client updateClient(int cid, Client client) {

	        Client existingClient = clientRepo.findById(cid)
	                .orElseThrow(() -> new RuntimeException("Client not found with id: " + cid));

	        existingClient.setName(client.getName());
	        existingClient.setAddress(client.getAddress());
	        existingClient.setGender(client.getGender());
	        existingClient.setMob(client.getMob());
	        existingClient.setDob(client.getDob());
	        existingClient.setAccno(client.getAccno());
	        existingClient.setAdhar(client.getAdhar());
	        existingClient.setPan(client.getPan());

	        existingClient.setNominee_name(client.getNominee_name());
	        existingClient.setNominee_pan(client.getNominee_pan());
	        existingClient.setNominee_adhar(client.getNominee_adhar());

	        existingClient.setRdstart(client.getRdstart());
	        existingClient.setRdamount(client.getRdamount());

	        return clientRepo.save(existingClient);
	    }

	    public void softDeleteClient(int cid) {

	        Client client = clientRepo.findById(cid)
	                .orElseThrow(() -> new RuntimeException("Client not found with id: " + cid));

	        client.setActive(false);   
	        clientRepo.save(client);
	    }
	    
	    public List<Client> getInactiveClients() {
	        return clientRepo.findInactiveClients();
	    }
	    
	    public void revokeClient(int cid) {

	        Client client = clientRepo.findById(cid)
	                .orElseThrow(() -> new RuntimeException("Client not found with id: " + cid));

	        client.setActive(true);   
	        clientRepo.save(client);
	    }
	    
}
