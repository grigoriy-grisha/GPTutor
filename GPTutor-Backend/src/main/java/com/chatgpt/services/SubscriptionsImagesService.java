package com.chatgpt.services;

import com.chatgpt.entity.SubscriptionImages;
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
            cancelSubscription(allRequestParams.get("user_id"), allRequestParams.get("subscription_id"), allRequestParams.get("item_id"));
        } else {
            activeSubscription(
                    allRequestParams.get("user_id"),
                    allRequestParams.get("subscription_id"),
                    allRequestParams.get("next_bill_time") != null
                            ? Integer.parseInt(allRequestParams.get("next_bill_time"))
                            : 0,
                    allRequestParams.get("item_id")
            );
        }



        return new SubscriptionsChangeResponse(
                Integer.parseInt(allRequestParams.get("subscription_id"))
        );

    }

    public SubscriptionImages getOrCreateSubscriptions(String vkUser, String subscriptionName) {
        var user = userService.getOrCreateVkUser(vkUser);

        var foundSubscriptions = subscriptionsImagesRepository.findByVkUserIdAndName(user.getId(), subscriptionName);
        if (foundSubscriptions != null) return foundSubscriptions;


        var subscriptionsImages = new SubscriptionImages(
                user,
                subscriptionName,
                false,
                null,
                0
        );

        subscriptionsImagesRepository.save(subscriptionsImages);

        return subscriptionsImages;
    }

    public SubscriptionImages getSubscription(String vkUser, String subscriptionName) {
        if (subscriptionIsEmpty(vkUser, subscriptionName)) {
            return getOrCreateSubscriptions(vkUser, subscriptionName);
        }

        return updateSubscription(vkUser, subscriptionName);
    }

    boolean subscriptionIsEmpty(String vkUser, String subscriptionName) {
        var subscription = getOrCreateSubscriptions(vkUser, subscriptionName);

        return subscription.getSubscriptionId() == null && subscription.getExpire() == 0;
    }

    void activeSubscription(String vkUser, String subscriptionId, int nextBillTime, String subscriptionName) {
        var subscription = getOrCreateSubscriptions(vkUser, subscriptionName);

        subscription.setActive(true);
        if (nextBillTime > 0) {
            subscription.setExpire(nextBillTime);
        }
        subscription.setSubscriptionId(subscriptionId);

        subscriptionsImagesRepository.save(subscription);
    }

    void cancelSubscription(String vkUser, String subscriptionId, String subscriptionName) {
        var subscription = getOrCreateSubscriptions(vkUser, subscriptionName);

        subscription.setActive(false);
        subscription.setSubscriptionId(subscriptionId);

        subscriptionsImagesRepository.save(subscription);
    }

    boolean isAvailableSubscription(String vkUser, String subscriptionName) {
        var subscription = getOrCreateSubscriptions(vkUser, subscriptionName);

        return new Date(subscription.getExpire() * 1000L).after(new Date());
    }

    public SubscriptionImages updateSubscription(String vkUser, String subscriptionName) {
        var subscription = getOrCreateSubscriptions(vkUser, subscriptionName);

        try {
            var order = vkService.getUserSubscriptionById(vkUser, subscription.getSubscriptionId());

            subscription.setActive(!order.getResponse().isPending_cancel());
            subscription.setExpire(order.getResponse().getExpire_time());

            subscriptionsImagesRepository.save(subscription);

            return subscription;

        } catch (Exception e) {
            System.out.println(e.toString());
            return subscription;
        }
    }
}
