package com.chatgpt.services;

import com.chatgpt.entity.DetailProblem;
import com.chatgpt.entity.LeetCodeProblem;
import com.chatgpt.entity.LeetCodeProblemResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class LeetCodeService implements InitializingBean {

    @Autowired
    private ResourceLoader resourceLoader;


    LeetCodeProblemResult leetCodeProblems;

    public void afterPropertiesSet() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:json/leetcodeProblems.json");
        String fileContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        leetCodeProblems = new ObjectMapper().readValue(fileContent, LeetCodeProblemResult.class);
    }

    public List<LeetCodeProblem> getProblems() {
        return leetCodeProblems.getStat_status_pairs();
    }

    public DetailProblem getProblemDetail(String name) throws IOException {
        String LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
        String DAILY_CODING_CHALLENGE_QUERY = "{\"query\":\"query questionContent($titleSlug: String!) {\\n  question(titleSlug: $titleSlug) { \\n    content \\n  }\\n}\",\"variables\":{\"titleSlug\":\"" + name + "\"}}";

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Content-Type", "application/json");

        RestTemplate restTemplate = new RestTemplate();

        HttpEntity<String> request = new HttpEntity<>(DAILY_CODING_CHALLENGE_QUERY, headers);

        ResponseEntity<String> response = restTemplate.exchange(LEETCODE_API_ENDPOINT, HttpMethod.POST, request, String.class);

        return new ObjectMapper().readValue(response.getBody(), DetailProblem.class);
    }
}
