package com.chatgpt.services;

import com.chatgpt.entity.OrderSubscription;
import com.chatgpt.entity.SubscriptionImages;
import com.chatgpt.entity.responses.OrderSubscriptionResponse;
import com.chatgpt.entity.responses.SubscriptionsChangeResponse;
import com.chatgpt.repositories.SubscriptionsImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            activeSubscription(
                    allRequestParams.get("user_id"),
                    allRequestParams.get("subscription_id"),
                    allRequestParams.get("next_bill_time") != null
                            ? Integer.parseInt(allRequestParams.get("next_bill_time"))
                            : 0
            );
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


        var subscriptionsImages = new SubscriptionImages(
                user,
                false,
                null,
                0
        );

        subscriptionsImagesRepository.save(subscriptionsImages);

        return subscriptionsImages;
    }

    void activeSubscription(String vkUser, String subscriptionId, int nextBillTime) throws Exception {
        var subscription = getOrCreateSubscriptions(vkUser);

        System.out.println(nextBillTime);

        subscription.setActive(true);
        if (nextBillTime > 0) {
            subscription.setExpire(nextBillTime);
        }
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

        return new Date(subscription.getExpire() * 1000L).after(new Date());
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
