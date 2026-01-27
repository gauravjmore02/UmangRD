package com.db.demo.dto;

import java.time.LocalDate;

public interface TransactionDto {
	
	    double getRdamount();
	    boolean isActive();

	   
	    int getTid();
	    int getCid();
	    LocalDate getDuedate();
	    LocalDate getInstallment_pay();
	    int getLate_days();
	    double getFine_amount();
	    double getTotal_amount();
	    boolean isFlag();

}
