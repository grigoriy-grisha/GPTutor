package com.chatgpt.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthCheckerService {

    private static final String ENCODING = "UTF-8";

    @Value("${auth.client.secret}")
    String clientSecret;

    public String splitBearer(String header) {
        return header.substring(7);
    }

    public String getVkUserId(String url) throws Exception {
        return getVkUserIdFromParams(getQueryParams(new URL(url)));
    }

    public String getVkUserIdFromParams( Map<String, String> params) {
        return params.getOrDefault("vk_user_id", "0");
    }

    public boolean checkAuthorizationHeader(String url) throws Exception {
        Map<String, String> queryParams = getQueryParams(new URL(url));

        return checkAuthorizationHeaderByParams(queryParams);
    }

    public boolean checkAuthorizationHeaderByParams(Map<String, String> queryParams) throws Exception {
        String checkString = queryParams.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith("vk_"))
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> encode(entry.getKey()) + "=" + (entry.getValue() == null ? encode("") : encode(entry.getValue())))
                .collect(Collectors.joining("&"));

        String sign = getHashCode(checkString, clientSecret);

        return sign.equals(queryParams.getOrDefault("sign", ""));
    }


    private static Map<String, String> getQueryParams(URL url) {
        String query = url.getQuery();
        if (query == null) return new LinkedHashMap<>();

        final Map<String, String> result = new LinkedHashMap<>();
        final String[] pairs = query.split("&");

        for (String pair : pairs) {
            int index = pair.indexOf("=");
            String key = index > 0 ? decode(pair.substring(0, index)) : pair;
            String value = index > 0 && pair.length() > index + 1 ? decode(pair.substring(index + 1)) : null;
            result.put(key, value);
        }

        return result;
    }

    private static String getHashCode(String data, String key) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key.getBytes(ENCODING), "HmacSHA256"));

        return new String(
                Base64
                        .getUrlEncoder()
                        .withoutPadding()
                        .encode(mac.doFinal(data.getBytes(ENCODING)))
        );
    }

    private static String decode(String value) {
        try {
            return URLDecoder.decode(value, ENCODING);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return value;
    }

    private static String encode(String value) {
        try {
            return URLEncoder.encode(value, ENCODING);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return value;
    }
}
