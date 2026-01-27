package com.db.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Client {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int cid;
	
	private String name;
	private String address;
	private String gender;
	private String mob;
	private LocalDate dob;
	private String accno;
	private String adhar;
	private String pan;
	
	//nominee
	private String nominee_name;
	private String nominee_pan;
	private String nominee_adhar;
	
	private LocalDate rdstart;
	private double rdamount;
	 private boolean active ;
	public boolean isActive() {
		return active;
	}
	 public void setActive(boolean active) {
		 this.active = active;
	 }
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMob() {
		return mob;
	}
	public void setMob(String mob) {
		this.mob = mob;
	}
	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public String getAccno() {
		return accno;
	}
	public void setAccno(String accno) {
		this.accno = accno;
	}
	public String getAdhar() {
		return adhar;
	}
	public void setAdhar(String adhar) {
		this.adhar = adhar;
	}
	public String getPan() {
		return pan;
	}
	public void setPan(String pan) {
		this.pan = pan;
	}
	public String getNominee_name() {
		return nominee_name;
	}
	public void setNominee_name(String nominee_name) {
		this.nominee_name = nominee_name;
	}
	public String getNominee_pan() {
		return nominee_pan;
	}
	public void setNominee_pan(String nominee_pan) {
		this.nominee_pan = nominee_pan;
	}
	public String getNominee_adhar() {
		return nominee_adhar;
	}
	public void setNominee_adhar(String nominee_adhar) {
		this.nominee_adhar = nominee_adhar;
	}
	public LocalDate getRdstart() {
		return rdstart;
	}
	public void setRdstart(LocalDate rdstart) {
		this.rdstart = rdstart;
	}
	public double getRdamount() {
		return rdamount;
	}
	public void setRdamount(double rdamount) {
		this.rdamount = rdamount;
	}
	
	
	
	

}
