package com.example.demo.repository;

import com.example.demo.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Integer> {
    Optional<VerificationToken> findByEmail(String email);
    Optional<VerificationToken> findByOtp(int Otp);
}
