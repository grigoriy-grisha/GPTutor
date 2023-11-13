package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.entity.PurchaseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

@Service
public class PurchaseService {
    @Autowired
    VkSecretesService vkSecretesService;

    Map<String, PurchaseItem> items = new HashMap<>();

    PurchaseService() {
        items.put("subscription_1", new PurchaseItem("Подписка на месяц", 21));
    }

    public PurchaseItem getItem(String itemName) {
        return items.get(itemName);
    }

    public void buyAttempts(String item, String vkId, String status) {
        if (!Objects.equals(status, "сhargeable")) throw new BadRequestException("Платеж не был совершен");

        var foundItem = getItem(item);
        if (foundItem == null) throw new BadRequestException("Товар не найден");


//        attemptsService.updateAttemptsUser(vkId, foundItem.getPrice());
    }

    public void isAccessSig(Map<String, String> params) {
        if (!Objects.equals(params.get("sig"), calcSignature(params))) {
            throw new BadRequestException("Подпись не прошла проверку");
        }
    }

    private String calcSignature(Map<String, String> params) {
        TreeMap<String, String> sortedParams = new TreeMap<>(decodeParams(params));

        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
            String item = entry.getKey();
            String value = entry.getValue();
            if (!item.equals("sig")) {
                sb.append(item)
                        .append('=')
                        .append(value);
            }
        }

        sb.append(vkSecretesService.getSecretKey(params.get("app_id")));

        return calculateMD5(sb.toString());
    }

    private String calculateMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String PHPUrlDecode(String input) {
        return URLDecoder.decode(
                input.replace("%21", "!")
                        .replace("%27", "'")
                        .replace("%28", "(")
                        .replace("%29", ")")
                        .replace("%2A", "*")
                        .replace("%7E", "~")
                        .replace("+", "%20"),
                StandardCharsets.UTF_8
        );
    }

    private Map<String, String> decodeParams(Map<String, String> params) {
        Map<String, String> decodedParams = new TreeMap<>();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            decodedParams.put(entry.getKey(), PHPUrlDecode(entry.getValue()));
        }
        return decodedParams;
    }
}
