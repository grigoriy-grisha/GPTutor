package com.chatgpt.services;

import com.chatgpt.entity.ApiKey;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class ApiKeysService implements InitializingBean {
    final int ATTEMPTS_5_DOLLARS = 3;
    final int ATTEMPTS_120_DOLLARS = 96 * 2;

    @Value("${api.keys.120dollars}")
    private String apiKeys120dollars;

    @Value("${api.keys.5dollars}")
    private String apiKeys5dollars;

    private ArrayList<ApiKey> apiKeys5dollarsList = new ArrayList<>();
    private ArrayList<ApiKey> apiKeys120dollarsList = new ArrayList<>();

    public ArrayList<ApiKey> getApiKeysMap(String keyType) {
        if (Objects.equals(keyType, "120")) {
            return this.apiKeys120dollarsList;
        }

        return this.apiKeys5dollarsList;
    }

    public List<ApiKey> getHiddenApiKeysMap(String keyType) {
        if (Objects.equals(keyType, "120")) {
            return this.apiKeys120dollarsList.stream().peek(item -> item.setKey("")).toList();
        }

        return this.apiKeys5dollarsList.stream().peek(item -> item.setKey("")).toList();
    }


    public void afterPropertiesSet() {
        setupApiKeysMap();
        scheduleReset();
    }

    void setupApiKeysMap() {
        final List<String> splitApiKeys120dollars = Arrays.asList(this.apiKeys120dollars.split(","));
        final List<String> splitApiKeys5dollars = Arrays.asList(this.apiKeys5dollars.split(","));


        final ArrayList<ApiKey> list120dollars = new ArrayList<>();
        if (!this.apiKeys120dollars.isEmpty()) {
            splitApiKeys120dollars.forEach((key) -> list120dollars.add(new ApiKey(key, ATTEMPTS_120_DOLLARS)));
        }

        final ArrayList<ApiKey> list5dollars = new ArrayList<>();
        if (!this.apiKeys5dollars.isEmpty()) {
            splitApiKeys5dollars.forEach((key) -> list5dollars.add(new ApiKey(key, ATTEMPTS_5_DOLLARS)));
        }

        this.apiKeys5dollarsList = list5dollars;
        this.apiKeys120dollarsList = list120dollars;
    }


    void refreshApiKeysMap5Dollars() {
        for (ApiKey item : apiKeys5dollarsList) {
            item.incrementAttempts();
        }
    }

    void refreshApiKeysMap120Dollars() {
        for (ApiKey item : apiKeys120dollarsList) {
            item.resetAttempts();
        }
    }

    public ApiKey getKey5dollars() {
        for (ApiKey item : this.apiKeys5dollarsList) {
            if (item.getAttempts() != 0 && !item.isBlocked()) {
                item.decrementAttempts();
                return item;
            }
        }

        return null;
    }

    public ApiKey getKey120dollars() {
        for (ApiKey item : this.apiKeys120dollarsList) {
            if (item.getAttempts() != 0  && !item.isBlocked()) {
                item.decrementAttempts();
                return item;
            }
        }

        return null;
    }

    public Pair<ApiKey, String> getKey() {
        var apiKey = getKey5dollars();
        if (apiKey != null) {
            return  Pair.of(apiKey, "5");
        }

        return Pair.of(getKey120dollars(), "120");
    }

    private void scheduleReset() {
        Timer timer120 = new Timer();
        timer120.schedule(new TimerTask() {
            public void run() {
                refreshApiKeysMap120Dollars();
            }
        }, 0, 60 * 1000);

        Timer timer5 = new Timer();
        timer5.schedule(new TimerTask() {
            public void run() {
                refreshApiKeysMap5Dollars();
            }
        }, 0, 20 * 1000);
    }
}
