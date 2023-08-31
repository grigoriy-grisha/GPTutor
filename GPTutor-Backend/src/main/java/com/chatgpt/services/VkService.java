package com.chatgpt.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class VkService {
    @Value("${vk.key}")
    String authToken;

    public Boolean groupIsMember(String groupId, String userId) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.vk.com/method/groups.isMember"
                + "?group_id={groupId}&user_id={userId}&access_token={accessToken}&v={v}";

        Map<String, String> params = new HashMap<>();
        params.put("groupId", groupId);
        params.put("userId", userId);
        params.put("accessToken", authToken);
        params.put("v", "5.131");

        String result = restTemplate.getForObject(url, String.class, params);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(result);

        return node.get("response").asBoolean();
    }
}
