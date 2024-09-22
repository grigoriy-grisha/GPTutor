package com.chatgpt.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthCheckerService {

    @Value("${tg-token}")
    private String botToken;

    @Autowired
    VkSecretesService vkSecretesService;

    private static final String ENCODING = "UTF-8";

    public String splitBearer(String header) {
        return header.substring(7);
    }

    public String splitTMA(String header) {
        return header.substring(4);
    }


    public String getVkUserId(String url) throws Exception {
        return getVkUserIdFromParams(getQueryParams(new URL(url)));
    }

    public String getVkAppId(String url) throws Exception {
        return getQueryParams(new URL(url)).get("vk_app_id");
    }

    public String getVkUserIdFromParams(Map<String, String> params) {
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

        String sign = getHashCode(checkString, vkSecretesService.getSecretKey(queryParams.get("vk_app_id")));

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

    public Boolean isUrlCheck(String url) throws MalformedURLException {
        return !getQueryParams(new URL(url)).get("vk_app_id").isEmpty();
    }

    public Boolean tgAuthCheck(String initData) {
        List<NameValuePair> params = URLEncodedUtils.parse(initData, StandardCharsets.UTF_8);
        System.out.println(params);
        List<NameValuePair> preparedData = new java.util.ArrayList<>(params
                .stream()
                .filter(e -> !e.getName().equals("hash"))
                .toList());

        preparedData
                .sort(Comparator.comparing(NameValuePair::getName));

        String dataCheckString = String.join("\n", preparedData
                .stream()
                .map(e -> e.getName() + "=" + e.getValue())
                .toList());

        String botTokenData = "WebAppData";
        byte[] hmacSecret = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, botTokenData).hmac(this.botToken);

        String calculatedHash = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, hmacSecret).hmacHex(dataCheckString);
        String presentedHash = params.get(4).getValue();

        return calculatedHash.equals(presentedHash);
    }

    public String getUserIdFromUrl(String encodedUrl) {
        try {
            String[] params = encodedUrl.split("&");
            String userParam = null;

            for (String param : params) {
                if (param.startsWith("user=")) {
                    userParam = param.substring(5); // Убираем "user="
                    break;
                }
            }

            if (userParam != null) {
                String decodedUser = URLDecoder.decode(userParam, StandardCharsets.UTF_8);
                System.out.println(decodedUser);
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode response = objectMapper.readTree(decodedUser);

                return response.get("id").asText();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "0";
    }
}
