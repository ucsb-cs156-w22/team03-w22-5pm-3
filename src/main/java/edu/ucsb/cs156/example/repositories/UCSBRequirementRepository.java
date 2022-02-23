package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.UCSBRequirement;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UCSBRequirementRepository extends CrudRepository<UCSBRequirement, Long> {
  Optional<UCSBRequirement> findById(Long id);
}