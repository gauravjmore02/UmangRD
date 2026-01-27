package com.db.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Transactions {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int tid;
	
	private int cid;
	
	private LocalDate duedate;
	private LocalDate installment_pay;
	
	private int late_days;
	
	private double fine_amount;
	private double total_amount;
	
	private boolean flag ;
	
	
	public boolean isFlag() {
		return flag;
	}
	public void setFlag(boolean flag) {
		this.flag = flag;
	}
	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public LocalDate getDuedate() {
		return duedate;
	}
	public void setDuedate(LocalDate duedate) {
		this.duedate = duedate;
	}
	public LocalDate getInstallment_pay() {
		return installment_pay;
	}
	public void setInstallment_pay(LocalDate installment_pay) {
		this.installment_pay = installment_pay;
	}
	public int getLate_days() {
		return late_days;
	}
	public void setLate_days(int late_days) {
		this.late_days = late_days;
	}
	public double getFine_amount() {
		return fine_amount;
	}
	public void setFine_amount(double fine_amount) {
		this.fine_amount = fine_amount;
	}
	public double getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(double total_amount) {
		this.total_amount = total_amount;
	}
	
	

}
