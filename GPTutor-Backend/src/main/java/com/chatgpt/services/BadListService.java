package com.chatgpt.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

@Service
public class BadListService {
    Pattern pattern;
    @Autowired
    private ResourceLoader resourceLoader;

    @PostConstruct
    void init() throws IOException {

        Resource resource = resourceLoader.getResource("classpath:badlist.txt");
        String fileContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

        String regex = "\\b(" + fileContent.replaceAll(",", "|") + ")\\b";
        pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
    }

    boolean checkText(String text) {
        return pattern.matcher(text).find();
    }

}
