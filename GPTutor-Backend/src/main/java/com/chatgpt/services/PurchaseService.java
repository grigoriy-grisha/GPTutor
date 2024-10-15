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
        items.put("energy_100000", new PurchaseItem("Покупка 100,000 energy ⚡", 30));
        items.put("energy_200000", new PurchaseItem("Покупка 200,000 energy ⚡", 60));
        items.put("energy_400000", new PurchaseItem("Покупка 400,000 energy ⚡", 120));
        items.put("energy_1000000", new PurchaseItem("Покупка 1,000,000 energy ⚡", 300));
        items.put("energy_5000000", new PurchaseItem("Покупка 5,000,000 energy ⚡", 1500));
    }

    public PurchaseItem getItem(String itemName) {
        return items.get(itemName);
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
