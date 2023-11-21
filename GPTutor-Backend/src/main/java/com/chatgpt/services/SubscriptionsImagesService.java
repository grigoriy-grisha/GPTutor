package com.chatgpt.services;

import com.chatgpt.entity.OrderSubscription;
import com.chatgpt.entity.SubscriptionImages;
import com.chatgpt.entity.responses.OrderSubscriptionResponse;
import com.chatgpt.entity.responses.SubscriptionsChangeResponse;
import com.chatgpt.repositories.SubscriptionsImagesRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

@Service
public class SubscriptionsImagesService {

    @Autowired
    SubscriptionsImagesRepository subscriptionsImagesRepository;

    @Autowired
    UserService userService;

    @Autowired
    VkService vkService;


    public SubscriptionsChangeResponse subscriptionStatusChange(Map<String, String> allRequestParams) throws Exception {

        if (Objects.equals(allRequestParams.get("status"), "active")
                && allRequestParams.get("cancel_reason") != null) {
            cancelSubscription(allRequestParams.get("user_id"), allRequestParams.get("subscription_id"));
        } else {
            activeSubscription(allRequestParams.get("user_id"), allRequestParams.get("subscription_id"));
        }

        return new SubscriptionsChangeResponse(
                Integer.parseInt(allRequestParams.get("subscription_id")),
                Integer.parseInt(allRequestParams.get("app_id"))
        );

    }

    public SubscriptionImages getOrCreateSubscriptions(String vkUser) throws Exception {
        var user = userService.getOrCreateVkUser(vkUser);

        var foundSubscriptions = subscriptionsImagesRepository.findByVkUserId(user.getId());
        if (foundSubscriptions != null) return foundSubscriptions;


        var subscriptionsImages = new SubscriptionImages(
                user,
                false,
                null,
                null,
               null
        );

        subscriptionsImagesRepository.save(subscriptionsImages);

        return subscriptionsImages;
    }

    void activeSubscription(String vkUser, String subscriptionId) throws Exception {
        var subscription = getOrCreateSubscriptions(vkUser);
        var vkSubscription = getLastSubscription(vkService.getUserSubscriptions(vkUser));

        subscription.setActive(true);
        subscription.setLastUpdated(Instant.now());
        subscription.setExpire(new Date(vkSubscription.expire_time * 1000).toInstant());
        subscription.setSubscriptionId(subscriptionId);

        subscriptionsImagesRepository.save(subscription);
    }

    void cancelSubscription(String vkUser, String subscriptionId) throws Exception {
        var subscription = getOrCreateSubscriptions(vkUser);

        subscription.setActive(false);
        subscription.setSubscriptionId(subscriptionId);

        subscriptionsImagesRepository.save(subscription);
    }

    boolean isAvailableSubscription(String vkUser) throws Exception {
        var subscription = getOrCreateSubscriptions(vkUser);
        if (subscription.getExpire() == null) {
            return false;
        }

        return subscription.getExpire().isAfter(Instant.now());
    }

    public OrderSubscription getLastSubscription(OrderSubscriptionResponse data) {
        OrderSubscription lastSubscription = null;
        for (OrderSubscription item : data.response.items) {
            if (item.app_id == 51692825) {
                if (lastSubscription == null || item.id > lastSubscription.id) {
                    lastSubscription = item;
                }
            }
        }

        return lastSubscription;
    }
}
