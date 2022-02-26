package edu.ucsb.cs156.example.documents;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeatureCollection {
  private String type;
  private Metadata metadata;
  private List<Feature> features;
}

