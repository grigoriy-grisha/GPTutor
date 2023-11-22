package com.chatgpt.services;

import com.chatgpt.entity.OrderSubscription;
import com.chatgpt.entity.SubscriptionImages;
import com.chatgpt.entity.responses.OrderSubscriptionResponse;
import com.chatgpt.entity.responses.SubscriptionsChangeResponse;
import com.chatgpt.repositories.SubscriptionsImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

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

        asyncMethodWithDelay(allRequestParams.get("user_id"));

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

    public SubscriptionImages getSubscription(String vkUser) {
        if (subscriptionIsEmpty(vkUser)) {
            return getOrCreateSubscriptions(vkUser);
        }

        return updateSubscription(vkUser);
    }

    boolean subscriptionIsEmpty(String vkUser) {
        var subscription = getOrCreateSubscriptions(vkUser);

        return subscription.getSubscriptionId() == null && subscription.getExpire() == 0;
    }

    void activeSubscription(String vkUser, String subscriptionId, int nextBillTime) throws Exception {
        var subscription = getOrCreateSubscriptions(vkUser);

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

    boolean isAvailableSubscription(String vkUser) {
        var subscription = getOrCreateSubscriptions(vkUser);

        return new Date(subscription.getExpire() * 1000L).after(new Date());
    }

    public SubscriptionImages updateSubscription(String vkUser) {
        var subscription = getOrCreateSubscriptions(vkUser);

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

    @Async
    void asyncMethodWithDelay(String vkUser) {
        System.out.println("async");
        System.out.println(vkUser);
        try {
            Thread.sleep(10000);
            updateSubscription(vkUser);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
