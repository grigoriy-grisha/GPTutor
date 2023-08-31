package com.chatgpt.controllers;

import com.chatgpt.entity.DetailProblem;
import com.chatgpt.entity.LeetCodeProblem;
import com.chatgpt.services.LeetCodeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class LeetCodeController {
    @Autowired
    LeetCodeService leetCodeService;

    @GetMapping(path = "/leetcode")
    List<LeetCodeProblem> getProblems() throws JsonProcessingException {
        return leetCodeService.getProblems();
    }

    @GetMapping(path = "/leetcode/{leetCodeName}")
    DetailProblem getProblemDetail(@PathVariable("leetCodeName") String leetCodeName) throws IOException {
        return leetCodeService.getProblemDetail(leetCodeName);
    }
}

