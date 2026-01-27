package com.db.demo.cntrl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.db.demo.entity.Transactions;
import com.db.demo.repo.TransactionRepo;
import com.db.demo.service.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionCntrl {
	
	@Autowired
	private TransactionRepo trepo;
	
	@Autowired 
	private TransactionService tService;
	
	
	 @GetMapping("/clients/{cid}")
	    public ResponseEntity<List<Transactions>> getTransactionsByClient(@PathVariable("cid") int cid) {
	        List<Transactions> transactions = tService.getTransactionsByClient(cid);
	        return ResponseEntity.ok(transactions);
	    }
	

	    // Soft delete a transaction
	    @PutMapping("/deactivate/{cid}")
	    public ResponseEntity<String> deactivateTransaction(@PathVariable("cid") int cid) {
	        tService.deactivateTransaction(cid);
	        return ResponseEntity.ok("Transaction marked inactive (flag=false)");
	    }
	    
	    @PostMapping("/pay/{cid}")
	    public Transactions payInstallment(
	            @PathVariable ("cid") int cid,
	            @RequestParam("installmentPay") LocalDate installmentPay) {

	        return tService.payInstallment(cid, installmentPay);
	    }
	

}
