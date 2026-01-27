package com.db.demo.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.demo.entity.Client;
import com.db.demo.entity.Transactions;
import com.db.demo.repo.ClientRepo;
import com.db.demo.repo.TransactionRepo;

@Service
public class TransactionService {
	
    private static final double FINE_PER_DAY = 50;
	 @Autowired
	    private TransactionRepo tRepo;
	 @Autowired
	    private ClientRepo crepo;

	    public List<Transactions> getTransactionsByClient(int cid) {
	        return tRepo.findByCid(cid);
	    }
	    
	    
	    public List<Transactions> getActiveTransactionsByClient(int cid) {
	        return tRepo.findByCidAndFlagTrue(cid);
	    }

	    // Soft delete transaction (set flag=false)
	    public void deactivateTransaction(int cid) {
	        Transactions transaction = tRepo.findById(cid)
	                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + cid));
	        transaction.setFlag(false);
	        tRepo.save(transaction);
	    }
	    
	    public Transactions payInstallment(int cid, LocalDate installmentPay) {

	        Client client = crepo.findById(cid)
	                .orElseThrow(() -> new RuntimeException("Client not found"));

	        double rdAmount = client.getRdamount();

	        //  Find last installment
	        Transactions lastTxn = tRepo.findTopByCidOrderByTidDesc(cid);

	        //  Decide due date for THIS installment
	        LocalDate dueDate;
	        if (lastTxn == null) {
	            // First installment
	            dueDate = client.getRdstart();
	        } else {
	            // Next installment due date = last due date + 1 month
	            dueDate = lastTxn.getDuedate().plusMonths(1);
	        }

	        // Calculate late days
	        long lateDays = ChronoUnit.DAYS.between(dueDate, installmentPay);
	        if (lateDays < 0) lateDays = 0;

	        // Fine & total
	        double fineAmount = lateDays * FINE_PER_DAY;
	        double totalAmount = rdAmount + fineAmount;

	        //  Save NEW ROW
	        Transactions txn = new Transactions();
	        txn.setCid(cid);
	        txn.setDuedate(dueDate);                // due date for this installment
	        txn.setInstallment_pay(installmentPay); // payment date
	        txn.setLate_days((int) lateDays);
	        txn.setFine_amount(fineAmount);
	        txn.setTotal_amount(totalAmount);
	        txn.setFlag(true);

	        return tRepo.save(txn);
	    }
}
