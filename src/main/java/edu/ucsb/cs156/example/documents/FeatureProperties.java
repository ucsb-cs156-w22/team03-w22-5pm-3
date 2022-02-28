package edu.ucsb.cs156.example.documents;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeatureProperties {

  private int mag;
  private String place;
  private long time;
  private long updated;
  private int tz;
  private String url;
  private String detail;
  private int felt;
  private int cdi;
  private int mmi;
  private String alert;
  private String status;
  private int tsunami;
  private int sig;
  private String net;
  private String code;
  private String ids;
  private String sources;
  private String types;
  private int nst;
  private int dmin;
  private int rms;
  private int gap;
  private String magType;
  private String type;
  private String title;
}

