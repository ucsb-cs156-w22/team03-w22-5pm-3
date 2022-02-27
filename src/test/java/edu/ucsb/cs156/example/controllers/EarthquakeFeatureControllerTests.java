package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.collections.EarthquakeCollection;
import edu.ucsb.cs156.example.documents.FeatureCollection;
import edu.ucsb.cs156.example.documents.Feature;
import edu.ucsb.cs156.example.documents.FeatureProperties;
import edu.ucsb.cs156.example.documents.Metadata;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(value = EarthquakeFeatureController.class)
@Import(TestConfig.class)
public class EarthquakeFeatureControllerTests extends ControllerTestCase {

  @MockBean
  EarthquakeCollection earthquakesCollection;

  @MockBean
  EarthquakeQueryService earthquakeQueryService;

  @MockBean
  UserRepository userRepository;

   @WithMockUser(roles = { "USER" })
        @Test
        public void api_eqfeatures_all__user_logged_in__returns_a_eqfeature_that_exists() throws Exception {

            FeatureProperties properties = FeatureProperties.builder()
            .mag(6.5)
            .place("test")
            .time(0x4000000L)
            .updated(0x5000L)
            .tz(8)
            .url("test")
            .detail("test")
            .felt(1)
            .cdi(1.1)
            .mmi(1.1)
            .alert("test")
            .status("test")
            .tsunami(1)
            .sig(1)
            .net("test")
            .code("test")
            .ids("test")
            .sources("test")
            .types("test")
            .nst(1)
            .dmin(0.1)
            .rms(0.1)
            .gap(0.1)
            .magType("test")
            .type("test")
            .build();

            List<FeatureProperties> lep = new ArrayList<>();
            lep.add(properties);

            Feature feature = Feature.builder()
            ._Id("a")
            .type("test")
            .properties(properties)
            .id("test")
            .build();

            List<Feature> lef = new ArrayList<>();
            lef.add(feature);

            when(earthquakesCollection.findAll()).thenReturn(lef);

                // act
            MvcResult response = mockMvc.perform(get("/api/earthquakes/all"))
                            .andExpect(status().isOk()).andReturn();

                // assert

            verify(earthquakesCollection, times(1)).findAll();
            String expectedJson = mapper.writeValueAsString(lef);
            String responseString = response.getResponse().getContentAsString();
            assertEquals(expectedJson, responseString);

        }

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void api_purge_eqfeatures_is_void() throws Exception {
            mockMvc.perform(post("/api/earthquakes/purge").with(csrf())).andExpect(status().isOk()).andReturn();

            verify(earthquakesCollection, times(1)).deleteAll();
    }   

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void api_retrieve_eqfeatures_is_void() throws Exception {
            FeatureProperties properties = FeatureProperties.builder()
            .mag(6.5)
            .place("test")
            .time(0x4000000L)
            .updated(0x5000L)
            .tz(8)
            .url("test")
            .detail("test")
            .felt(1)
            .cdi(1.1)
            .mmi(1.1)
            .alert("test")
            .status("test")
            .tsunami(1)
            .sig(1)
            .net("test")
            .code("test")
            .ids("test")
            .sources("test")
            .types("test")
            .nst(1)
            .dmin(0.1)
            .rms(0.1)
            .gap(0.1)
            .magType("test")
            .type("test")
            .build();

            List<FeatureProperties> lep = new ArrayList<>();
            lep.add(properties);

            Feature feature = Feature.builder()
            ._Id("a")
            .type("test")
            .properties(properties)
            .id("test")
            .build();

            List<Feature> lef = new ArrayList<>();
            lef.add(feature);

            Metadata md = Metadata.builder()
                .generated(123)
                .url("")
                .title("metadata")
                .status(200)
                .api("")
                .count(1)
                .build();

            FeatureCollection el = FeatureCollection.builder()
                .type("EQlisting")
                .metadata(md)
                .features(lef)
                .build();

            String magnitude = "10";
            String distance = "100";

            when(earthquakeQueryService.getJSON(distance, magnitude)).thenReturn(mapper.writeValueAsString(el));
            when(earthquakesCollection.saveAll(lef)).thenReturn(lef);

            MvcResult response = mockMvc.perform(post(String.format("/api/earthquakes/retrieve?distance=%s&minMag=%s", distance, magnitude))
                .with(csrf()))
                .andExpect(status().isOk()).andReturn();

            verify(earthquakesCollection, times(1)).saveAll(lef);
            verify(earthquakeQueryService, times(1)).getJSON(distance, magnitude);
            String expectedJson = mapper.writeValueAsString(lef);
            String responseString = response.getResponse().getContentAsString();
            assertEquals(expectedJson, responseString);
    }

}