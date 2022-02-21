package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.CollegiateSubreddit;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.repositories.CollegiateSubredditRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;


@Api(description = "CollegiateSubreddit")
@RequestMapping("/api/collegiateSubreddits")
@RestController
@Slf4j
public class CollegiateSubredditController extends ApiController{
    

    public class CollegiateSubredditOrError {
        Long id;
        CollegiateSubreddit subreddit;
        ResponseEntity<String> error;

        public CollegiateSubredditOrError(Long id) {
            this.id = id;
        }
    }


    @Autowired
    CollegiateSubredditRepository collegiateSubredditRepository;

    @Autowired
    ObjectMapper mapper;


    @ApiOperation(value = "List this user's collegiateSubreddit")
    // @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<CollegiateSubreddit> getCollegiateSubreddit() {
        // loggingService.logMethod();
        Iterable<CollegiateSubreddit> collegiateSubreddit = collegiateSubredditRepository.findAll();
        return collegiateSubreddit;
    }

    @ApiOperation(value = "Create a new subreddit")
    // @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public CollegiateSubreddit postCollegiateSubreddit(
            @ApiParam("name") @RequestParam String name,
            @ApiParam("location") @RequestParam String location,
            @ApiParam("subreddit") @RequestParam String subreddit) {
        // loggingService.logMethod();
        // CurrentUser currentUser = getCurrentUser();
        // log.info("currentUser={}", currentUser);

        CollegiateSubreddit collegiateSubreddit = new CollegiateSubreddit();
        collegiateSubreddit.setName(name);
        collegiateSubreddit.setLocation(location);
        collegiateSubreddit.setSubreddit(subreddit);
        CollegiateSubreddit savedcollegiateSubreddit = collegiateSubredditRepository.save(collegiateSubreddit);
        return savedcollegiateSubreddit;
    }


    @ApiOperation(value = "Get a single subreddit")
    // @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public ResponseEntity<String> getCollegiateSubredditById(
            @ApiParam("id") @RequestParam Long id) throws JsonProcessingException {
        // loggingService.logMethod();
        CollegiateSubredditOrError toe = new CollegiateSubredditOrError(id);

        toe = doesCollegiateSubredditExist(toe);
        if (toe.error != null) {
            return toe.error;
        }
        
        String body = mapper.writeValueAsString(toe.subreddit);
        return ResponseEntity.ok().body(body);
    }


    public CollegiateSubredditOrError doesCollegiateSubredditExist(CollegiateSubredditOrError toe) {

        Optional<CollegiateSubreddit> optionalReq = collegiateSubredditRepository.findById(toe.id);

        if (optionalReq.isEmpty()) {
            toe.error = ResponseEntity
                    .badRequest()
                    .body(String.format("subreddit with id %d not found", toe.id));
        } else {
            toe.subreddit = optionalReq.get();
        }
        return toe;
    }



    @ApiOperation(value = "Update a single subreddit")
    // @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("")
    public ResponseEntity<String> putCollegiateSubredditById(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid CollegiateSubreddit incomingCollegiateSubreddit) throws JsonProcessingException {
        // loggingService.logMethod();

        CollegiateSubredditOrError coe = new CollegiateSubredditOrError(id);

        coe = doesCollegiateSubredditExist(coe);
        if (coe.error != null) {
            return coe.error;
        }
        CollegiateSubreddit oldSubreddit = coe.subreddit;
        oldSubreddit.setName(incomingCollegiateSubreddit.getName());
        oldSubreddit.setLocation(incomingCollegiateSubreddit.getLocation());
        oldSubreddit.setSubreddit(incomingCollegiateSubreddit.getSubreddit());

        collegiateSubredditRepository.save(oldSubreddit);

        String body = mapper.writeValueAsString(oldSubreddit);
        return ResponseEntity.ok().body(body);
    }


    @ApiOperation(value = "Delete a subreddit by ID")
    @DeleteMapping("")
    public ResponseEntity<String> deleteCollegiateSubreddit(
            @ApiParam("id") @RequestParam Long id) {
        // loggingService.logMethod();

        CollegiateSubredditOrError soe = new CollegiateSubredditOrError(id);

        soe = doesCollegiateSubredditExist(soe);
        if (soe.error != null) {
            return soe.error;
        }

        collegiateSubredditRepository.deleteById(id);
        return ResponseEntity.ok().body(String.format("subreddit with id %d deleted", id));
    }


}
