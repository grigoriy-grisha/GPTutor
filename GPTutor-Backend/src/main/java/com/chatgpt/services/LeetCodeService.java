package com.chatgpt.services;

import com.chatgpt.entity.DetailProblem;
import com.chatgpt.entity.LeetCodeProblem;
import com.chatgpt.entity.LeetCodeProblemResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.Headers;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.ServerRequest;

import java.io.IOException;
import java.net.http.HttpHeaders;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeetCodeService {
    LeetCodeProblemResult leetCodeProblemResult;

    public List<LeetCodeProblem> getProblems() throws JsonProcessingException {
        if (leetCodeProblemResult != null) return leetCodeProblemResult.getStat_status_pairs();

        RestTemplate restTemplate = new RestTemplate();

        String result = restTemplate.getForObject("https://leetcode.com/api/problems/all/", String.class);

        leetCodeProblemResult = new ObjectMapper().readValue(result, LeetCodeProblemResult.class);

        return leetCodeProblemResult.getStat_status_pairs();
    }

    public DetailProblem getProblemDetail(String name) throws IOException {
        String LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
        String DAILY_CODING_CHALLENGE_QUERY = "{\"query\":\"query questionContent($titleSlug: String!) {\\n  question(titleSlug: $titleSlug) { \\n    content \\n  }\\n}\",\"variables\":{\"titleSlug\":\"" + name +"\"}}";

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Content-Type", "application/json");

        RestTemplate restTemplate = new RestTemplate();

        HttpEntity<String> request = new HttpEntity<>(DAILY_CODING_CHALLENGE_QUERY, headers);

        ResponseEntity<String> response = restTemplate.exchange(LEETCODE_API_ENDPOINT, HttpMethod.POST, request, String.class);

        return new ObjectMapper().readValue(response.getBody(), DetailProblem.class);
    }
}
