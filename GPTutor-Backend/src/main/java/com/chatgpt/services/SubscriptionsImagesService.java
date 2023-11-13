package com.chatgpt.services;

import com.chatgpt.entity.SubscriptionImages;
import com.chatgpt.entity.responses.SubscriptionsChangeResponse;
import com.chatgpt.repositories.SubscriptionsImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Objects;

@Service
public class SubscriptionsImagesService {

    @Autowired
    SubscriptionsImagesRepository subscriptionsImagesRepository;

    @Autowired
    UserService userService;


    public SubscriptionsChangeResponse subscriptionStatusChange(Map<String, String> allRequestParams) {
        if (Objects.equals(allRequestParams.get("status"), "chargeable")) {
            activeSubscription(allRequestParams.get("user_id"), allRequestParams.get("subscription_id"));
        }

        return new SubscriptionsChangeResponse(
                Integer.parseInt(allRequestParams.get("subscription_id")),
                Integer.parseInt(allRequestParams.get("app_id"))
        );

    }

    public SubscriptionImages getOrCreateSubscriptions(String vkUser) {
        var user = userService.getOrCreateVkUser(vkUser);
        var foundSubscriptions = subscriptionsImagesRepository.findByVkUserId(user.getId());
        if (foundSubscriptions != null) return foundSubscriptions;

        var subscriptionsImages = new SubscriptionImages(user, false, null, null);
        subscriptionsImagesRepository.save(subscriptionsImages);

        return subscriptionsImages;
    }

    void activeSubscription(String vkUser, String subscriptionId) {
        var subscription = getOrCreateSubscriptions(vkUser);

        subscription.setActive(true);
        subscription.setLastUpdated(Instant.now());
        subscription.setSubscriptionId(subscriptionId);

        subscriptionsImagesRepository.save(subscription);
    }

    SubscriptionImages cancelSubscription(String vkUser, String subscriptionId) {
        var subscription = getOrCreateSubscriptions(vkUser);

        subscription.setActive(false);
        subscription.setLastUpdated(null);
        subscription.setSubscriptionId(subscriptionId);

        subscriptionsImagesRepository.save(subscription);

        return subscription;
    }

}
